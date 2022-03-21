const mongoose = require('mongoose')

const url = 'mongodb+srv://Lauri:salasana@wmdb.lvzr9.mongodb.net/personlist?retryWrites=true&w=majority'


mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String
})

module.exports = Person
