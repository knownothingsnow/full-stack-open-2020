import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContacts = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteContacts = id => axios.delete(`${baseUrl}/${id}`)

export default {
  getAllContacts,
  createContacts,
  deleteContacts
}
