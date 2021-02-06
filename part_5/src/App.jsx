import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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

  const login = async (e) => {
    e.preventDefault()
    const result = await loginService.login({ username, password })
    localStorage.setItem('user', JSON.stringify(result))
    setUser(result)
    clearLoginForm()
  }

  const logout = () => {
    setUser(null)
    localStorage.setItem('user', '')
  }

  const usernameHandler = (e) => {
    setUsername(e.target.value)
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  }

  if (!user) {
    return (
      <div>
        <h2>login required</h2>
        <form onSubmit={login}>
          <label>username:
            <input type="text" name="username" value={username} onChange={usernameHandler}/>
          </label>
          <label>password:
            <input type="password" name="password" value={password} onChange={passwordHandler}/>
          </label>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h3>Blogs</h3>
      <div>{user.username} logged in
        <button onClick={logout}>logout!</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
