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
    <div className="aBlog" style={blogStyle}>
      <p>
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author">{blog.author}</span>
        <button className="blog-toggle" onClick={toggleExtend}>{extend ? 'hide' : 'view'}</button>
      </p>
      {extend &&
        <>
          <p className="blog-url">{blog.url}</p>
          <p className="blog-likes">Likes:{blog.likes} <button onClick={() => { likeBlog(blog) }}>like</button></p>
          <p>{blog.user?.username}</p>
          <button onClick={() => { removeBlog(blog) }}>remove</button>
        </>}
    </div>
  )
}

export default Blog
