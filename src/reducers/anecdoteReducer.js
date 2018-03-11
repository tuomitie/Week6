import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  if (action.type==='VOTE') {
    const old = state.filter(a => a.id !==action.id)
    const voted = state.find(a => a.id === action.id)
    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return [...state, action.data]
  }
  if (action.type === 'INITIALIZE') {
    return action.data
  }
  return state
}

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

export const createContent = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnec
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecs
    })
  }
}

export default reducer