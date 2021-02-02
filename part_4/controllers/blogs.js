const blogRouter = require('express').Router()
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogRouter.post('/', async (req, res, next) => {
  if (!req.body.title || !req.body.url) {
    return res.status(400).send()
  }
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  console.log('login success')
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...req.body,
    user: user._id,
    likes: req.body.likes || 0
  })
  await blog.save()
  const newBlogs = await Blog.populate(blog, { path: 'user' })
  await user.updateOne({ blogs: user.blogs.concat(newBlogs._id) })
  res.status(201).json(newBlogs)
})

blogRouter.delete('/:id', async function (req, res, next) {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async function (req, res, next) {
  if (!req.body.title || !req.body.url) {
    return res.status(400).send()
  }
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  console.log('login success')
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    ...req.body,
    user: user._id,
    likes: req.body.likes || 0
  })
  await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
  const newBlogs = await Blog.populate(blog, { path: 'user' })
  _.pull(user.blogs, req.params.id)
  await user.updateOne({ blogs: user.blogs.concat(newBlogs._id) })
  res.json(newBlogs)
})

module.exports = blogRouter
