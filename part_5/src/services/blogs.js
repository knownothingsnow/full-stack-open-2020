import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, create }
