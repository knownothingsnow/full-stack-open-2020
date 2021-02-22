import React, { useEffect, useState } from 'react'
import './App.css'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // createForm
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const emptyMessage = { type: '', content: '' }
  const [message, setMessage] = useState(emptyMessage)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const u = JSON.parse(userJSON)
      setUser(u)
    }
  }, [])

  const clearLoginForm = () => {
    setUsername('')
    setPassword('')
  }

  const showMessage = ({ type, content }, delay) => {
    setMessage({ type, content })
    if (delay) {
      setTimeout(() => { setMessage(emptyMessage) }, delay * 1000)
    }
  }

  const login = async (e) => {
    e.preventDefault()
    try {
      const result = await loginService.login({ username, password })
      localStorage.setItem('user', JSON.stringify(result))
      setUser(result)
      showMessage({ type: 'success', content: `blog added successfully by ${result?.name}` }, 3)
      clearLoginForm()
    } catch (error) {
      console.error(error)
      showMessage({ type: 'error', content: 'wrong username or password' }, 3)
      clearLoginForm()
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.setItem('user', '')
  }

  const usernameHandler = (e) => { setUsername(e.target.value) }
  const passwordHandler = (e) => { setPassword(e.target.value) }

  const titleHandler = e => { setTitle(e.target.value) }
  const authorHandler = e => { setAuthor(e.target.value) }
  const urlHandler = e => { setUrl(e.target.value) }

  const createBlog = async (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    try {
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      showMessage({ type: 'success', content: `blog added successfully by ${user.name}` }, 3)
    } catch (err) {
      console.log(err)
      showMessage({ type: 'error', content: 'add blog failed' }, 3)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login here'>
      <LoginForm
        message={message}
        loginHandler={login}
        username={username}
        password={password}
        usernameHandler={usernameHandler}
        passwordHandler={passwordHandler}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog'>
      <CreateForm
        title={title}
        author={author}
        url={url}
        titleHandler={titleHandler}
        authorHandler={authorHandler}
        urlHandler={urlHandler}
        submitHandler={createBlog}
        message={message}
      />
    </Togglable>
  )
  return (
    /* eslint-disable react/jsx-closing-tag-location */
    <div>
      <h3>Blogs</h3>
      {!user
        ? loginForm()
        : <div>
          <div>{user.username} logged in
            <button onClick={logout}>logout!</button>
          </div>
          {blogForm()}
        </div>}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
