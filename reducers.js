const counterState = {
  count: 0
};

/* counterReducer, 一个子 reducer */
/* 注意：counterReducer 接收的 state 是 state.counter */
function counterReducer(state = counterState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
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

const infoState = {
  name: '前端九部',
  description: '我们都是前端爱好者！'
};

/* InfoReducer，一个子 reducer */
/* 注意：InfoReducer 接收的 state 是 state.info */
function infoReducer(state = infoState, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}

module.exports = {
  counterReducer,
  infoReducer
}