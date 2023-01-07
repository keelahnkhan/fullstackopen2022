import React, { useState } from 'react';

const App = () => {;
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123-4567'},
    { name: 'Blorp Blorpington', number: '120-208-5999'},
    { name: 'Artobenne Blousington', number: '029-553-4666'}
  ]);
  const [newPerson, setNewPerson] = useState({name: '', number: ''});
  const [criteria, setCriteria] = useState('');

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

  const changeCriteria = (event) => setCriteria(event.target.value);

  return (  
    <div>
      <h2>PhoneBook</h2>
      <div>
        filter shown with <input value={criteria} onChange={changeCriteria}/>
      </div>
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
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(criteria.toLowerCase().trim()))
          .map((person) => 
            <p key={person.name}>
              {person.name} {person.number}
            </p>)}
      </div>
    </div>
  );
}
 
export default App;