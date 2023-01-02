import { useState } from "react";

const Statistics = ({feedbacks}) => {

  let total = feedbacks.reduce((accumulator, currFeedback) => 
      accumulator + currFeedback.clicks, 0);
  let average = feedbacks.reduce((accumulator, currFeedback) => 
      accumulator + currFeedback.clicks * currFeedback.score, 0) / total;
  let positive = feedbacks[0].clicks / total;

  return (  
    <div>
      <h1>Statistics</h1>
      {feedbacks.map(feedback => 
        <Feedback name={feedback.name} clicks={feedback.clicks}/>)
      }
      <p>total = {total}</p>
      <p>average = {average}</p>
      <p>positive = {positive} %</p>
    </div>
  );
}

const Feedback = ({name, clicks}) => {
  return (
    <p>{name} = {clicks}</p>
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
      clicks: good,
      score: 1,
      handleClick: () => incrementValue(good, setGood)
    },
    {
      name: 'neutral',
      clicks: neutral,
      score: 0,
      handleClick: () => incrementValue(neutral, setNeutral)
    },
    {
      name: 'bad',
      clicks: bad, 
      score: -1,
      handleClick: () => incrementValue(bad, setBad)
    }
  ];

  return (
    <div>
      <h2>Give Feedback</h2>
      {feedbacks.map(feedback => 
        <Button handleClick={feedback.handleClick} name={feedback.name}/>
      )}
      <Statistics feedbacks={feedbacks}/>
    </div>
  );
}

export default App;
