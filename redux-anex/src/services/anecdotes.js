import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const createNew = async (anecdote) => {
  const content = anecdote.content
  const id = anecdote.id
  const votes = anecdote.votes
  const response = await axios.post(url, { content, id, votes })
  return response.data
}

const update = async (newAnecdote) => {
  const id = newAnecdote.id
  const response = await axios.put(`${url}/${id}`, newAnecdote)
  return response.data
}

export default {
  getAll, createNew, update
}
