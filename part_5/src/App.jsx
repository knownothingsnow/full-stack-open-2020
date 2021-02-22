import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const toggleBlogFormRef = useRef()
  const blogFormRef = useRef()

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
      showMessage({ type: 'success', content: `welcome, ${result?.name}` }, 3)
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

  const createBlog = async (newBlog) => {
    try {
      const res = await blogService.create(newBlog)
      setBlogs(blogs.concat(res))
      showMessage({ type: 'success', content: `blog added successfully by ${user.name}` }, 3)
      toggleBlogFormRef.current.toggleVisibility()
      blogFormRef.current.clear()
    } catch (err) {
      console.log(err)
      showMessage({ type: 'error', content: 'add blog failed' }, 3)
    }
  }

  const likeBlog = async (blog) => {
    try {
      await blogService.likeThis({
        ...blog,
        likes: blog.likes + 1
      })
      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
    } catch (err) {
      console.error(err)
      showMessage({ type: 'error', content: `like blog ${blog.title} failed` }, 3)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login here'>
      <LoginForm
        message={message}
        loginHandler={login}
        username={username}
        password={password}
        usernameHandler={(e) => { setUsername(e.target.value) }}
        passwordHandler={(e) => { setPassword(e.target.value) }}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={toggleBlogFormRef}>
      <CreateForm createBlog={createBlog} ref={blogFormRef} />
    </Togglable>
  )
  return (
    /* eslint-disable react/jsx-closing-tag-location */
    <div>
      <Notification message={message} />
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
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
        />
      )}
    </div>
  )
}

export default App
