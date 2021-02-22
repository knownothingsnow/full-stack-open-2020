import React, { useState } from 'react'
/* eslint-disable react/prop-types */
const Blog = ({ blog, likeBlog }) => {
  const [extend, setExtend] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExtend = () => { setExtend(!extend) }
  const likeThis = () => {
    console.log(blog.likes)
    likeBlog(blog)
  }
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author}
        <button onClick={toggleExtend}>{extend ? 'hide' : 'view'}</button>
      </p>
      {extend &&
        <>
          <p>{blog.url}</p>
          <p>Likes:{blog.likes} <button onClick={likeThis}>like</button></p>
          <p>{blog.user?.username}</p>
        </>}
    </div>
  )
}

export default Blog
