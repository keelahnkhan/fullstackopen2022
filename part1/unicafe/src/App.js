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
        <Statistic name={feedback.name} value={feedback.clicks}/>)
      }
      <Statistic name='Total' value={total}/>
      <Statistic name='Average' value={average || 0}/>
      <Statistic name='Positive' value={positive || 0}/>
    </div>
  );
}

const Statistic = ({name, value}) => {
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
      name: 'Good',
      clicks: good,
      score: 1,
      handleClick: () => incrementValue(good, setGood)
    },
    {
      name: 'Neutral',
      clicks: neutral,
      score: 0,
      handleClick: () => incrementValue(neutral, setNeutral)
    },
    {
      name: 'Bad',
      clicks: bad, 
      score: -1,
      handleClick: () => incrementValue(bad, setBad)
    }
  ];

  return (
    <div>
      <h1>Give Feedback</h1>
      {feedbacks.map(feedback => 
        <Button handleClick={feedback.handleClick} name={feedback.name}/>
      )}
      <Statistics feedbacks={feedbacks}/>
    </div>
  );
}

export default App;
