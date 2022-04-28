 const createStore = function (reducer) {
  let state = undefined;
  const listeners = [];

  /* 订阅 */
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }
  
  function dispatch(action) {
    state = reducer(state, action);
    /* 通知 */
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function replaceReducer() {
    reducer = nextReducer
    /* 刷新一遍 state 的值，新来的 reducer 把自己的默认状态放到 state 树上去 */
    dispatch({ type: Symbol() })
  }

  // 为了得到初始化 state , dispatch 一个独一无二的值
  dispatch(Symbol())

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState,
    replaceReducer
  }
}

// Reducer 肯定会划分，按经验是组件级别划分，所以需要结合 Reducer 的方法
function combineReducer(reducerObj) {
  const reducerKeys = Object.keys(reducerObj);

  return function curryReducer(state = {}, action) {
    const newStateMap = {};
    reducerKeys.forEach(key => {
      const reducer = reducerObj[key];
      const prevState = state[key];
      const newState = reducer(prevState, action);
      newStateMap[key] = newState;
    })
    return newStateMap;
  }
}

module.exports = {
  createStore, combineReducer
};
