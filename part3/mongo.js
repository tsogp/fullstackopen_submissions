const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb+srv://tsogp:${password}@cluster0.9kagbpv.mongodb.net/?retryWrites=true&w=majority`

const userSchema = new mongoose.Schema({
    name: String,
    number: String,
    date: Date,
})

const User = mongoose.model('User', userSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        if (process.argv.length > 3) {
            user = new User({
                name: process.argv[3],
                number: process.argv[4],
                date: new Date(),
            })

            user.save().then(() => {
                console.log('user saved!')
            }).catch(err => {
                console.log(err)
            })
        } else {
            users = User.find({}).then(result => {
                result.forEach(user => {
                    console.log(user)
                })
            })
        }
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))