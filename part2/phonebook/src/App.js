import React, { useState } from 'react';

const App = () => {;
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123-4567'}
  ]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});

  const updatePersons = (event) => {
    event.preventDefault();

    if (-1 !== persons.findIndex((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to the phonebook`);
      return;
    }

    if (!(newPerson.name.trim() && newPerson.number.trim())) {
      alert(`Both name and number are required`);
      return;
    }

    const newPersons = persons.concat(newPerson);
    setPersons(newPersons);
    setNewPerson({name: '', number: ''});
  }

  const changeName = (event) => {
    console.log("name changed", event.target.value);
    const person = { ...newPerson, name: event.target.value};
    setNewPerson(person);
  } 

  const changeNumber = (event) => {
    console.log("number changed", event.target.value);
    const person = { ...newPerson, number: event.target.value};
    setNewPerson(person);
  }

  return (  
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={updatePersons}>
        <div>
          name: <input value={newPerson.name} onChange={changeName}/>
        </div>
        <div>
          number: <input value={newPerson.number} onChange={changeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => 
          <p key={person.name}>
            {person.name} {person.number}
          </p>)}
      </div>
    </div>
  );
}
 
export default App;