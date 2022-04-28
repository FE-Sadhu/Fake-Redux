const {createStore} = require('./redux.js');

const initState = {
  count: 0
}

// 有计划地管理状态更改  -->  否则外面 changeState 任意值都有效
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}

const store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.count);
});
/*自增*/
store.dispatch({
  type: 'INCREMENT'
});
/*自减*/
store.dispatch({
  type: 'DECREMENT'
});
/*我想随便改 计划外的修改是无效的！*/
store.dispatch({
  count: 'abc'
});