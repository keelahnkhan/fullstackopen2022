require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const Phonebook = require('./models/phonebook');

morgan.token('body', (request) => {
  return JSON.stringify(request.body);
});

app.use(express.static(__dirname + '/build'));
app.use(cors());
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (request, response) => request.method !== 'POST'
}));
app.use(morgan('tiny', {
  skip: (request) => request.method === 'POST'
}));

app.get('/api/persons', (request, response, next) => {
  Phonebook.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch(err => next(err));
});

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.get('/info', (request, response, next) => {
  Phonebook.find({})
    .then(persons => {
      const date = new Date();
      response.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>`);
    })
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end();
    })
    .catch(err => next(err));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;

  const person = new Phonebook({
    name: body.name,
    number: body.number
  });

  Phonebook.exists({ name: body.name })
    .then(result => {
      if (result) {
        return response.status(400).json({ error: 'duplicate person found' });
      } else {
        return person.save()
          .then(person => {
            response.json(person);
          });
      }
    })
    .catch(err => next(err));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number
  };

  Phonebook.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(person => {
      response.json(person);
    })
    .catch(err => next(err));
});

app.use((error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  next(error);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));