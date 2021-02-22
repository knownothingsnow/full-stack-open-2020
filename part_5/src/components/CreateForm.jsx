import React from 'react'
import Notification from './Notification'
const createFrom = ({
  title, author, url,
  titleHandler, authorHandler, urlHandler,
  submitHandler, message
}) => {
  return (
    <>
      <h3>create new</h3>
      <Notification message={message} />
      <form onSubmit={submitHandler}>
        <div>
          <label>title:
            <input type='text' name='title' value={title} onChange={e => titleHandler(e)} />
          </label>
        </div>
        <div>
          <label>author:
            <input type='text' name='author' value={author} onChange={e => authorHandler(e)} />
          </label>
        </div>
        <div>
          <label>url:
            <input type='text' name='url' value={url} onChange={e => urlHandler(e)} />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}
export default createFrom
