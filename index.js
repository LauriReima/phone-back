const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')
const cors = require('cors')
// const logger = (req, res, next) => {
//     console.log('logger')
//     console.log('method:', req.method)
//     console.log('path:', req.path)
//     console.log('body:', req.body)
//     next()
// }

app.use(bodyParser.json())
//app.use(logger)
app.use(cors())
app.use(express.static('build'))

const formatPerson = (person) => {
    return {
        name: person.name,
        number: person.number,
        id: person._id
    }
}
// let persons = [
//     {
//         name: "Jari Jerry",
//         number: "040 123 465 7",
//         id: 1
//     },
//     {
//         name: "Kaarina Joki",
//         number: "040 765 324 7",
//         id: 2
//     },
//     {
//         name: "Seppo Ilmarinen",
//         number: "040 098 321 4",
//         id: 3
//     }
// ]

app.get('/', (req, res) => {
    res.send('<h1>hello</h1>')
})
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
       res.json(persons.map(formatPerson)) 
    })
})
app.get('/api/persons/:id', (req, res) => {
    // const id = Number(req.params.id)
    // const person = persons.find(p => p.id === id)
    Person
        .findById(req.params.id)
        .then(p => {
            if (p){
               res.json(formatPerson(p)) 
            }
            else {
                res.status(404).end()
            }
        })
        .catch(err => {
            console.log(err)
            res.status(404).send({error: 'malformatted id'})
        })
    // if (person) {
    //     res.json(person)
    //     console.log(person.name)
    // }
    // else {
    //     res.status(404).end()
    // }
    
})
app.delete('/api/persons/:id', (req, res) => {
    //const id = Number(req.params.id)
    //persons = persons.filter((p) => p.id !== id)
    Person
        .findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => {
            console.log(err)
            res.status(400).send({error: 'malformated id'})
        })
    
})


app.post('/api/persons/', (req, res) => {
    const nimi = req.body.name
    const numero = req.body.number
    
    if (nimi === '' || numero === '') {
        return (res.status(400)).json({error: 'nimi tai numero puuttuu'})
    }
    else if (persons.map((p) => p.name).includes(nimi)) {
        return (res.status(400).json({error: 'name must be unique'}))
    }
    else if (persons.map((p) => p.number).includes(numero)) {
        return (res.status(400).json({error: 'number must be unique'}))
    }  
    const person = new Person({
        name: nimi,
        number: numero
    })
    person.save().then(savedPerson => {
        res.json(formatPerson(savedPerson))
    })
})
const error = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}
app.use(error)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`port: ${PORT}`)
})
