const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/mongo')
const api = supertest(app)

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

beforeEach(async () => {
  await Blog.deleteMany({})
  const models = testSet.map((item) => new Blog(item))
  await Promise.all(models.map((item) => item.save()))
})

test('blogs number is right', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(testSet.length)
})

afterAll(() => {
  mongoose.connection.close()
})
