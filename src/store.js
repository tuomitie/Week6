import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer
})

const store = createStore(reducer)
console.log(store.getState())

export default store