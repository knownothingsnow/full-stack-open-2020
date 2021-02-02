const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/blogs', async (request, response, next) => {
  if (request.title === undefined || request.url === undefined) {
    return response.status(400).send()
  }
  const blog = new Blog({
    likes: request.body.likes || 0,
    ...request.body
  })
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/blogs/:id', async function (req, res, next) {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogRouter.put('/blogs/:id', async function (req, res, next) {
  const result = await Blog.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
  res.json(result)
})

module.exports = blogRouter
