import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (data) => {
  const res = await axios.post(baseUrl, data)
  return res?.data
}

export default {
  getAll,
  addAnecdote
}