const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).send()
  }
  const blog = new Blog({
    user: '60194fd61e04b3569f9bf0c5',
    likes: request.body.likes || 0,
    ...request.body
  })
  await blog.save()
  const newBlogs = await Blog.populate(blog, { path: 'user' })
  response.status(201).json(newBlogs)
})

blogRouter.delete('/:id', async function (req, res, next) {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/:id', async function (req, res, next) {
  const result = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
  res.json(result)
})

module.exports = blogRouter
