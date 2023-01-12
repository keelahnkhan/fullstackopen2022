const PersonForm = (props) => {

  let newPerson = props.newPerson;
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={newPerson.name} onChange={props.changeName}/>
      </div>
      <div>
        number: <input value={newPerson.number} onChange={props.changeNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;