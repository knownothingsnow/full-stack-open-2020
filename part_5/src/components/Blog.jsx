/* eslint-disable */
import React, { useState } from 'react'
const Blog = ({ blog }) => {
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
        <button onClick={toggleExtend}>{extend? 'hide':'view'}</button>
      </p>
      {extend &&
        <>
          <p>{blog.url}</p>
          <p>Likes:{blog.likes} <button>like</button></p>
          <p>{blog.user?.username}</p>
        </>
      }
    </div>
  )
}

export default Blog
