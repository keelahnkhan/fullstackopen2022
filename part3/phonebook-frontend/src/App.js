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
  const [notification, setNotification] = useState({message: '', error: false});

  useEffect(() => {
    persist
      .retrieve()
      .then(data => {
        console.log('fetching data');
        setPersons(data);
      });
  },[]);

  const createNotification = (message, error) => {
    setNotification({message, error});
    setTimeout(() => setNotification({message: '', error: false}), 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const dupeIdx = persons.findIndex((person) => person.name === newPerson.name);
    if (-1 !== dupeIdx) {
      
      const dupePerson = persons[dupeIdx];
      if (window.confirm(`${newPerson.name} is already added to the phonebook, replace old number?`)) {
        persist
          .update(newPerson, dupePerson.id)
          .then(data => {
            setPersons(persons.map((person) => {
              if (person.id === dupePerson.id) 
                return data; 
              return person;
            }));
            setNewPerson({name: '', number: '', id: ''});
            createNotification(`Updated ${data.name}`, false);
          })
          .catch(error => {
            console.log("Error on update", error);
            createNotification(`Information of ${newPerson.name} has already been removed from server`, true);
            const newPersons = persons.filter(item => item.id !== dupePerson.id);
            setPersons(newPersons);
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
        createNotification(`Added ${data.name}`, false);
      });
  }

  const deletePerson = (person) => {

    if (window.confirm("Are you sure you want to delete?")) {
      persist
        .remove(person.id)
        .then(data => {
          const newPersons = persons.filter(item => item.id !== person.id);
          setPersons(newPersons);
        })
        .catch(error => {
          createNotification(`${person.name} has already been deleted from server`, true);
          const newPersons = persons.filter(item => item.id !== person.id);
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
      {notification.message && <Notification notification={notification}/>}
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