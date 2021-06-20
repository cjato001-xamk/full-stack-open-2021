const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Invalid params!')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fso-user:${password}@cluster0.fdtof.mongodb.net/fso-phonebook-test?retryWrites=true&w=majority`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((error) => {
    console.log(error.message)

    process.exit(1)
  })

const close = () => {
  mongoose.connection.close()

  process.exit(0)
}

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('Phonebook:')
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })

    close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`Added ${person.name} number ${person.number} to phonebook.`)

    close()
  })
}
