const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const blogs = await User.find({}).populate('Blogs')
  res.json(blogs)
})

usersRouter.post('/', async (req, res, next) => {
  const name = req.body.name
  const username = req.body.username
  const password = req.body.password
  if (!password || password.length < 3) {
    return res.status(403).json({ message: 'password is invalid' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    name,
    username,
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser)
})

// usersRouter.delete('/:id', async function (req, res, next) {
//   await User.findByIdAndRemove(req.params.id)
//   res.status(204).end()
// })

// usersRouter.put('/:id', async function (req, res, next) {
//   const result = await User.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
//   res.json(result)
// })

module.exports = usersRouter
