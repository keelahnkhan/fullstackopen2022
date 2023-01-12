import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import persist from './services/persist';
import './index.css';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({name: '', number: '', id: ''});
  const [criteria, setCriteria] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    persist
      .retrieve()
      .then(data => {
        console.log('fetching data');
        setPersons(data);
      });
  },[]);

  const addPerson = (event) => {
    event.preventDefault();

    const dupeIdx = persons.findIndex((person) => person.name === newPerson.name);
    if (-1 !== dupeIdx) {
      
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace old number?`)) {
        console.log(newPerson);
        persist
          .update(newPerson, dupeIdx+1)
          .then(data => {
            setPersons(persons.map((person, idx) => {
              if (idx === dupeIdx) 
                return data; 
              return person;
            }));
            setNewPerson({name: '', number: '', id: ''});
            setNotification(`Updated ${data.name}`);
            setTimeout(() => {
              setNotification('');
            }, 5000);
        });
      }
      return;
    }

    if (!(newPerson.name.trim() && newPerson.number.trim())) {
      alert(`Both name and number are required`);
      return;
    }

    persist
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data));
        setNewPerson({name: '', number: '', id: ''});
        setNotification(`Added ${data.name}`);
        setTimeout(() => {
          setNotification('');
        }, 5000);
      });
  }

  const deletePerson = (id) => {

    if (window.confirm("Are you sure you want to delete?")) {
      persist
        .remove(id)
        .then(data => {
          const newPersons = persons.filter(item => item.id !== id);
          setPersons(newPersons);
        });
    }
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
      <h2 className='header'>PhoneBook</h2>
      {notification && <Notification message={notification}/>}
      <Filter criteria={criteria} changeCriteria={changeCriteria}/>

      <h3>Add a new number</h3>
      <PersonForm newPerson={newPerson} 
                  addPerson={addPerson}
                  changeName={changeName} 
                  changeNumber={changeNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} criteria={criteria} deletePerson={deletePerson}/>
    </div>
  );
}
 
export default App;