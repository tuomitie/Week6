const reducer = (store = {}, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION' :
    store = action.data.notification.text
    return JSON.stringify(store)
  case 'CLEAR_NOTIFICATION' :
    store = {}
    return store.toString()
  default:
    return store.toString()
  }
}

export const setNotification = (input) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: input
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer