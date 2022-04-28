const { applyMiddleware, exceptionMiddleware, timeMiddleware, loggerMiddleware } = require('./applyMiddleware.js');
const { bindActionCreators } = require('./bindActionCreators.js');
const { counterReducer, infoReducer } = require('./reducers.js');
const { createStore, combineReducer } = require('./redux.js');

const reducer = combineReducer({
  counter: counterReducer,
})

const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);

/* 这里没有传 initState 哦 */
const store = newCreateStore(reducer);

/* 这里看看初始化的 state 是什么 */
console.dir(store.getState());

/* 生成新的reducer (随着组件按需加载时会用到) */
const nextReducer = combineReducer({
  counter: counterReducer,
  info: infoReducer
});
/* replaceReducer */
store.replaceReducer(nextReducer);

/* 这里看看初始化的 state 是什么 */
console.dir(store.getState());


store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});

// /*自增*/
// store.dispatch({
//   type: 'INCREMENT'
// });

// /*修改 name*/
// store.dispatch({
//   type: 'SET_NAME',
//   name: '前端九部2号'
// });

/* 返回 action 的函数就叫 actionCreator */
function increment() {
  return {
    type: 'INCREMENT'
  }
}

function setName(name) {
  return {
    type: 'SET_NAME',
    name: name
  }
}

// const actions = {
//   increment: function () {
//     return store.dispatch(increment.apply(this, arguments))
//   },
//   setName: function () {
//     return store.dispatch(setName.apply(this, arguments))
//   }
// }
// 一般 bindActionCreators 只会在 react-redux 的 connect 的实现里才会用到
// 这种写法效果等同上面注释。只不过隐藏了公共代码而已
const actions = bindActionCreators({ increment, setName }, store.dispatch);

/* 注意：我们可以把 actions 传到任何地方去 */
/* 其他地方在实现自增的时候，根本不知道 dispatch，actionCreator 等细节 */
actions.increment(); /* 自增 */
actions.setName('bindActionCreators'); /* 修改 info.name */