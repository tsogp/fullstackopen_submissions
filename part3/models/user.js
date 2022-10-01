const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose
    .connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error happened while connecting: ', error.message)
    })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: (v) => {
            return v.indexOf('-') === v.lastIndexOf('-') && v.indexOf('-') >= 2 && v.indexOf('-') <= v.length - 3
        }
    },
    date: {
        type: Date,
        required: true
    }
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)