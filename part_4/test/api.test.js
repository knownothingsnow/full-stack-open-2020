const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const api = supertest(require('../app'))

const Blog = require('../models/blog')
const User = require('../models/user')

const helper = require('./test_helper')

describe('when there is initially some blogs saved', () => {
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
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('get all users', async () => {
    const res = await api.get('/api/users')
    expect(res.body).toHaveLength(1)
    expect(res.body[0].username).toEqual('root')
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

  test('add an invalid user', async () => {
    const usersAtStart = await helper.usersInDb()
    await api
      .post('/api/users')
      .send({
        name: 'Bruce Lee',
        password: 'aaaaagh-da!'
      })
      .expect(403)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

    // const usersAtStart = await helper.usersInDb()
    // const check = async (user, api) => {
    //   await api
    //     .post('/api/users')
    //     .send(user)
    //     .expect(403)
    //     .expect('Content-Type', /application\/json/)
    //   const usersAtEnd = await helper.usersInDb()
    //   expect(usersAtEnd).toHaveLength(usersAtStart.length)
    // }
    // const userA = {
    //   name: 'Bruce Lee',
    //   password: 'aaaaagh-da!'
    // }
    // check(userA, api)
    // const userB = {
    //   username: 'lixiaolong',
    //   name: 'Bruce Lee'
    //   // password: 'aaaaagh-da!'
    // }
    // check(userB, api)
    // const userC = {
    //   username: 'li',
    //   name: 'Bruce Lee',
    //   password: 'aaaaagh-da!'
    // }
    // check(userC, api)
    // const userD = {
    //   username: 'li',
    //   name: 'Bruce Lee',
    //   password: 'a'
    // }
    // check(userD, api)
    // const userE = {
    //   username: 'root',
    //   name: 'Bruce Lee',
    //   password: 'a'
    // }
    // check(userE, api)
  })
})
