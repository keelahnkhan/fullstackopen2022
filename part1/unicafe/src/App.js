import { useState } from "react";

const Feedback = ({name, value}) => {
  return (
    <p>{name} = {value}</p>
  );
}

const Button = ({handleClick, name}) => {
  return (  
    <button onClick={handleClick}>
      {name}
    </button>
  );
}

const App = () => {

  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const incrementValue = (value, setValue) => { 
    let newVal = value + 1;
    setValue(newVal);
  };

  const feedbacks = [
    {
      name: 'good',
      value: good,
      handleClick: () => incrementValue(good, setGood)
    },
    {
      name: 'neutral',
      value: neutral,
      handleClick: () => incrementValue(neutral, setNeutral)
    },
    {
      name: 'bad',
      value: bad,
      handleClick: () => incrementValue(bad, setBad)
    }
  ];

  return (
    <div>
      <h2>Give Feedback</h2>
      {feedbacks.map(feedback => 
        <Button handleClick={feedback.handleClick} name={feedback.name}/>
      )}
      <h1>Statistics</h1>
      {feedbacks.map(feedback => 
        <Feedback name={feedback.name} value={feedback.value}/>)
      }
    </div>
  );
}

export default App;
