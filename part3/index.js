const express = require('express');
const app = express();

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
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

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));