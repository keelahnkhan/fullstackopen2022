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
  skip: (request, response) => request.method !== "POST" 
}));
app.use(morgan('tiny', {skip: (request) => request.method === "POST"}));

app.get("/api/persons", (request, response) => {
  Phonebook.find({})
    .then((persons) => {
      response.json(persons);
    });
});

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find(person => person.id === Number(request.params.id));
  
  person ? response.json(person) : response.status(404).end();
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.delete("/api/persons/:id", (request, response) => {
  const newPersons = persons.filter(person => person.id !== Number(request.params.id));
  persons = newPersons;
  response.send(204);
});

app.post("/api/persons", (request, response) => {
  const id = Math.floor(Math.random() * 9999999);
  const body = request.body;

  if (!body.number) {
    return response.status(400).json({error: "number missing"});
  } else if (!body.name) {
    return response.status(400).json({error: "name missing"});
  } else if (persons.find(person => person.name === body.name)) {
    return response.status(400).json({error: "name must be unique"});
  }

  const person = {
    id: id, 
    name: body.name, 
    number: body.number
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));