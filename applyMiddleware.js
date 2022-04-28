const exceptionMiddleware = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (err) {
    console.error('错误报告: ', err)
  }
}

const timeMiddleware = (store) => (next) => (action) => {
  console.log('time', new Date().getTime());
  next(action);
}

const loggerMiddleware = (store) => (next) => (action) => {
  console.log('this state', store.getState());
  console.log('action', action);
  next(action);
  console.log('next state', store.getState());
}

function applyMiddleware(...middlewares) {
  return function rewriteCreateStore(oldCreateStore) {
    return function createStore(reducer) {
      /* 1. 生成 store */
      const store = oldCreateStore(reducer);
      /* 给每个 middleware 传下 store，相当于 const logger = loggerMiddleware(store); */
      /* const chain = [exception, time, logger] */
      const chain = middlewares.map(middleware => middleware(store));
      let dispatch = store.dispatch;
      /* 实现 exception(time((logger(dispatch))))*/
      chain.reverse().forEach(middleware => {
        dispatch = middleware(dispatch);
      });

      /* 2. 重写 dispatch */
      store.dispatch = dispatch;
      return store;
    }
  }
}

module.exports = {
  applyMiddleware,
  exceptionMiddleware,
  timeMiddleware,
  loggerMiddleware
}