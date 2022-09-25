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

app.get('/api/persons', (request, response) => {
    User.find({}).then(result => {
        response.json(result)
    })
})

app.get('/api/persons/:id', (request, response) => {
    User.find({_id: request.params.id}).then(result => {
        response.json(result)
    })
})

app.post('/api/persons', (request, response) => {
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

    user.save().then(() => {
        console.log('user saved!')
    })

    response.json(user)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})