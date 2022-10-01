const User = require('./models/user')

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
morgan.token('body', (req) => {
    return JSON.stringify(req['body'])
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
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
        number: request.body.number,
    }

    User.findByIdAndUpdate(
        request.params.id,
        user,
        { new: true, runValidators: true, context: 'query'}
    ).then(updatedNote => {
        response.json(updatedNote)
    }).catch(error => next(error))
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
    const user = new User({
        name: request.body.name,
        number: request.body.number,
        date: new Date(),
    })

    user.save()
        .then(savedNote => {
            response.json(savedNote)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ 'error': 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError' || error.name === 'AxiosError') {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

