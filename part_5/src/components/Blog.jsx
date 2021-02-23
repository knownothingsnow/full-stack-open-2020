import React, { useState } from 'react'
/* eslint-disable react/prop-types */
const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [extend, setExtend] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExtend = () => { setExtend(!extend) }

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleExtend}>{extend ? 'hide' : 'view'}</button>
      </p>
      {extend &&
        <>
          <p>{blog.url}</p>
          <p>Likes:{blog.likes} <button onClick={() => { likeBlog(blog) }}>like</button></p>
          <p>{blog.user?.username}</p>
          <button onClick={() => { removeBlog(blog) }}>remove</button>
        </>}
    </div>
  )
}

export default Blog
