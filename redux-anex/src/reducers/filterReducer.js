const reducer = (store = '', action) => {
  switch (action.type) {
  case 'SET_FILTER' :
    store = action.content.text
    return store
  default:
    return store
  }
}

export const filterContent = (input) => {
  return {
    type: 'SET_FILTER',
    content: {
      text: input
    }
  }
}

export default reducer