const mongoose = require('mongoose')

const url = 'mongodb+srv://fullstack:sekred@cluster0-eajgd.mongodb.net/fullstack-notes'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: String,
    id: Number
})

const person = new Person()
