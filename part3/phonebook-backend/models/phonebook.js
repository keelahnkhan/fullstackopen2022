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
  name: {
    type: String,
    minLength: [3, 'Name must be 3 characters in length'],
    required: [true, 'Name is a required field']
  },
  number: {
    type: String,
    required: [true, 'Number is a required field']
  }
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