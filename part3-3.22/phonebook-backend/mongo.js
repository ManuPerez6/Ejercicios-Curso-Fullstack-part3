const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://manu:${password}@mycluster.djdcqgx.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=MyCluster`

mongoose.set('strictQuery', true)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({ name, number })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('Usage:')
  console.log('  To add:    node mongo.js <password> <name> <number>')
  console.log('  To list:   node mongo.js <password>')
  mongoose.connection.close()
}

