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

test('blogs have id defined', async () => {
  const res = await api.get('/api/blogs')
  for (const i of res.body) {
    expect(i.id).toBeDefined()
  }
})

test('add a blogs', async () => {
  const newBlog = {
    title: 'asdasdasd',
    author: 'xx',
    url: 'so.com',
    likes: 999
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /json/)
    .expect(201)
  const afterAdd = await helper.blogsInDb()
  expect(afterAdd).toHaveLength(helper.testSet.length + 1)
  expect(afterAdd.map(i => i.title)).toContain(newBlog.title)
})

test('empty like will set to default 0', async () => {
  const newBlog = {
    title: 'aaa',
    author: 'xx',
    url: 'so.com'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect('Content-Type', /json/)
    .expect(201)
  const afterAdd = await helper.blogsInDb()
  expect(
    afterAdd
      .filter(i => i.title === newBlog.title)[0]
      .likes
  ).toEqual(0)
})

test('missing url or title will get code 400', async () => {
  const newBlog = {
    author: 'xx',
    likes: 222
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
