const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs)
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    ...body,
    passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
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
