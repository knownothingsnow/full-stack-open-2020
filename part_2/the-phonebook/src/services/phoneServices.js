import axios from 'axios'
const baseUrl = '/api/persons'

const getAllContacts = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createContacts = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const updateContacts = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteContacts = id => axios.delete(`${baseUrl}/${id}`)

export default {
  getAllContacts,
  createContacts,
  updateContacts,
  deleteContacts
}
