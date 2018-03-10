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

const update = (id, newAnecdote) => {
  const request = axios.put(`${url}/${id}`, newAnecdote)
  return request.then(response => response.data)
}

export default {
  getAll, createNew, update
}
