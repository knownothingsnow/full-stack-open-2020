import React, { useState } from 'react'

const createFrom = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNew = (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
  }
  return (
    <>
      <h3>create new</h3>
      <form onSubmit={addNew}>
        <div>
          <label>title:
            <input type='text' name='title' value={title} onChange={e => { setTitle(e.target.value) }} />
          </label>
        </div>
        <div>
          <label>author:
            <input type='text' name='author' value={author} onChange={e => { setAuthor(e.target.value) }} />
          </label>
        </div>
        <div>
          <label>url:
            <input type='text' name='url' value={url} onChange={e => { setUrl(e.target.value) }} />
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}
export default createFrom
