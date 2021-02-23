import axios from 'axios'
import { reverse, sortBy } from 'lodash'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return reverse(sortBy(res?.data, ['likes']))
}

const create = async (blog) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  if (token) {
    const config = {
      headers: { Authorization: `bearer ${token}` }
    }
    const res = await axios.post(baseUrl, blog, config)
    return res?.data
  } else {
    throw new Error('token is missing')
  }
}

const likeThis = async (blog) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  if (token) {
    const config = {
      headers: { Authorization: `bearer ${token}` }
    }
    const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
    return res?.data
  } else {
    throw new Error('token is missing')
  }
}

const removeBlog = async (blog) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  if (token) {
    const config = {
      headers: { Authorization: `bearer ${token}` }
    }
    const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return res?.data
  } else {
    throw new Error('token is missing')
  }
}

export default { getAll, create, likeThis, removeBlog }
