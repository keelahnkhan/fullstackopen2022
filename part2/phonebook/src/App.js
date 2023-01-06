import React, { useState } from 'react';

const App = () => {;
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]);
  const [newName, setNewName] = useState('');

  const updatePersons = (event) => {
    event.preventDefault();

    if (-1 !== persons.findIndex((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const newPerson = { name: newName };
    const newPersons = persons.concat(newPerson);
    setPersons(newPersons);
    setNewName('');
  }

  const changeName = (event) => {
    console.log("name changed", event.target.value);
    setNewName(event.target.value);
  }

  return (  
    <div>
      <h2>PhoneBook</h2>
      <form onSubmit={updatePersons}>
        <div>
          name: <input value={newName} onChange={changeName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  );
}
 
export default App;