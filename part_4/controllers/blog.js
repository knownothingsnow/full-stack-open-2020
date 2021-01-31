const blogRouter = require('express').Router()
const Blog = require('../models/mongo')

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

module.exports = blogRouter
