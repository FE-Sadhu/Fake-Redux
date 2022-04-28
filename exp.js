const { applyMiddleware, exceptionMiddleware, timeMiddleware, loggerMiddleware } = require('./applyMiddleware.js');
const { counterReducer, infoReducer } = require('./reducers.js');
const { createStore, combineReducer } = require('./redux.js');

const reducer = combineReducer({
  counter: counterReducer,
})

/* 生成新的reducer (随着组件按需加载时会用到) */
const nextReducer = combineReducers({
  counter: counterReducer,
  info: infoReducer
});
/* replaceReducer */
store.replaceReducer(nextReducer);

const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);

/* 这里没有传 initState 哦 */
const store = newCreateStore(reducer);

/* 这里看看初始化的 state 是什么 */
console.dir(store.getState());

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});

/*自增*/
store.dispatch({
  type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
});