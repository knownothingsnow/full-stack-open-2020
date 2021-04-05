import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const res = await axios.post(baseUrl, {content,votes:0})
  return res?.data
}

const vote = async ({id,votes,content}) => {
  const res = await axios.put(`${baseUrl}/${id}`, {votes,content})
  return res?.data
}

export default {
  getAll,
  create,
  vote
}