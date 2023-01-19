require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length !== 5 && process.argv.length !== 3) {
  console.log('Incorrect amount of arguments');
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];
const MONGO_URI = process.env.MONGO_URI;
const uri = MONGO_URI.replace('PASSWORD', password);

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

if (process.argv.length === 5) {

  mongoose.connect(uri)
    .then((result) => {
      const person = new Phonebook({
        name,
        number
      });
      return person.save();
    })
    .then(result => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch(error => {
      console.log('Error occurred on saving to database', error);
    });
} else {
  mongoose.connect(uri)
    .then((result) => {
      return Phonebook.find({});
    })
    .then(result => {
      console.log('phonebook:');
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    })
    .catch(error => {
      console.log('Error occurred on retrieving numbers', error);
    });
}