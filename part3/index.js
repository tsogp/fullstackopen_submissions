const User = require('./models/user')

const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
morgan.token('body', (req) => {
    return JSON.stringify(req['body'])
})

const app = express()
app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (request, response, next) => {
    User.find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const user = {
        name: request.body.name,
        number: request.body.number
    }

    User.findOneAndUpdate({ name: request.body.name }, user, { new: true })
        .then(updatedNote => {
            response.json(updatedNote).end()
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    User.findById(request.params.id)
        .then(result => {
            response.json(result).end()
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    User.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    if (!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: "name or number are missing"
        })
    }

    const user = new User({
        name: request.body.name,
        number: request.body.number,
        date: new Date(),
    })

    user.save()
        .then(() => {
            console.log('user saved!')
        })
        .catch(error => next(error))

    response.json(user)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)