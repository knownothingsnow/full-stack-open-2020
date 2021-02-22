
import React from 'react'
import Notification from './Notification'
/* eslint-disable react/prop-types */
const LoginForm = ({
  message,
  loginHandler,
  username,
  password,
  usernameHandler,
  passwordHandler
}) => (
  <div>
    <h2>login required</h2>
    <Notification message={message} />
    <form onSubmit={loginHandler}>
      <label>username:
        <input type='text' name='username' value={username} onChange={usernameHandler} />
      </label>
      <label>password:
        <input type='password' name='password' value={password} onChange={passwordHandler} />
      </label>
      <button type='submit'>login</button>
    </form>
  </div>
)

export default LoginForm
