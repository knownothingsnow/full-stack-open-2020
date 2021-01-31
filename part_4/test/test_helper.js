const Blog = require('../models/mongo')

const testSet = [
  {
    title: 'first',
    author: 'somebody',
    url: 'so.com',
    likes: 12
  },
  {
    title: 'second',
    author: 'somebody',
    url: 'qq.com',
    likes: 23
  },
  {
    title: 'third',
    author: 'somebody',
    url: 'baidu.com',
    likes: 34
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  testSet, nonExistingId, blogsInDb
}
