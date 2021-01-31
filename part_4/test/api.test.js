const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/mongo')
const api = supertest(app)
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const models = helper.testSet.map((item) => new Blog(item))
  await Promise.all(models.map((item) => item.save()))
})

test('blogs number is right', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.testSet.length)
})

afterAll(() => {
  mongoose.connection.close()
})
