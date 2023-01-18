const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log('connecting to ', url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to mongoDB')
  })
  .catch((error) => {
    console.log('error connecting to mongodb: ', error.message);
  });

const phonebookSchema = mongoose.Schema({
  name: String,
  number: String
});

phonebookSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id; 
    delete returnObject.__v;
  }
});

const Phonebook = mongoose.model('Phonebook', phonebookSchema);

module.exports = Phonebook;