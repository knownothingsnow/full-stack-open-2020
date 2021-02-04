const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const supertest = require('supertest')
const api = supertest(require('../app'))

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')
/* eslint-disable comma-dangle */
/* describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {

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
    const token = await api.get('/api/login').token
    const newBlog = {
      title: 'asdasdasd',
      author: 'xx',
      url: 'so.com',
      likes: 999
    }
    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
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

  test('delete a blog', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToDelete = blogsBefore[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length - 1)
    expect(blogsAfter.map(i => i.url)).not.toContain(blogToDelete.url)
  })

  test('update a blog', async () => {
    const blogsBefore = await helper.blogsInDb()
    const blogToUpdate = {
      ...blogsBefore[0],
      likes: 123
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
    const blogsAfter = await Blog.findById(blogToUpdate.id)
    expect(blogsAfter.likes).toEqual(123)
  })

  afterAll(() => {
    mongoose.connection.close()
  })
}) */

describe('get everything prepared initially', () => {
  let token
  beforeAll(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const initialRootUser = {
      username: 'root',
      passwordHash
    }
    const user = new User(initialRootUser)
    const rootUser = await user.save()

    token = jwt.sign({
      id: rootUser._id,
      username: rootUser.username
    }, process.env.SECRET)
    // console.log(rootUser, token)
    const models = helper.testSet.map((item) => new Blog({ ...item, user: rootUser.id }))
    const blogs = await Promise.all(models.map((item) => item.save()))

    user.blogs = blogs.map(i => i.id)
    await user.save()
  }, 10 * 1000)

  afterAll(() => {
    mongoose.connection.close()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'lixiaolong',
      name: 'Bruce Lee',
      password: 'aaaaagh-da!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('get all users', async () => {
    await helper.usersInDb()
    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(2)
    expect(res.body[0].username).toEqual('root')
  })

  test.each([
    {
      title: 'without username',
      name: 'Bruce Lee',
      password: 'aaaaagh-da!',
    },
    {
      title: 'without password',
      username: 'lixiaolong',
      name: 'Bruce Lee'
    },
    {
      title: 'with short username',
      username: 'li',
      name: 'Bruce Lee',
      password: 'aaaaagh-da!'
    },
    {
      title: 'with short password',
      username: 'lixiaolong',
      name: 'Bruce Lee',
      password: 'a'
    },
    {
      title: 'with duplicate username',
      username: 'root',
      name: 'Bruce Lee',
      password: 'aaaaagh-da!'
    }
  ])('add an invalid user', async (user) => {
    const usersAtStart = await helper.usersInDb()
    // console.log(`test ${user.title}`)
    await api
      .post('/api/users')
      .send(_.pick(user, ['username', 'name', 'password']))
      .expect(403)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  }, 10 * 1000)
})
