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

module.exports = {createStore};
