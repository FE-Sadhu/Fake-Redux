 const createStore = function (reducer, initState) {
  let state = initState;
  const listeners = [];

  /* 订阅 */
  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    /* 通知 */
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    dispatch,
    getState
  }
}

// Reducer 肯定会划分，按经验是组件级别划分，所以需要结合 Reducer 的方法
function combineReducer(reducerObj) {
  const reducerKeys = Object.keys(reducerObj);

  return function curryReducer(state, action) {
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
