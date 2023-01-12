const Persons = ({persons, criteria, deletePerson}) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(criteria.toLowerCase().trim()))
        .map((person) => 
          <p key={person.id}>
            {person.name} {person.number} 
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </p>)}
    </div>
  );
};

export default Persons;