const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const person = persons.find((p) => p.id === id)
  if (person) {
    res.json(person).send()
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter((note) => note.id !== id)
  res.status(204).end()
})

function getRandomInt (min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

let maxId

app.post('/api/persons', (req, res) => {
  if (!maxId) {
    maxId = Math.max(...persons.map((p) => p.id))
  }
  const person = req.body
  const newPerson = {
    id: getRandomInt(maxId, Number.MAX_SAFE_INTEGER),
    ...person
  }
  persons = persons.concat({
    id: getRandomInt(maxId, Number.MAX_SAFE_INTEGER),
    ...newPerson
  })
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <div>${new Date()}</div>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
