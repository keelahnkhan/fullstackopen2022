import { useState } from "react";

const Statistics = ({feedbacks}) => {

  let total = feedbacks.reduce((accumulator, currFeedback) => 
      accumulator + currFeedback.clicks, 0);
  let average = feedbacks.reduce((accumulator, currFeedback) => 
      accumulator + currFeedback.clicks * currFeedback.score, 0) / total;
  let positive = feedbacks[0].clicks / total;
 
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (  
    <div>
      <table>
        <tbody>
          {feedbacks.map(feedback => 
            <StatisticLine key={feedback.name} 
                      name={feedback.name} 
                      value={feedback.clicks}/>)}
          <StatisticLine name='Total' value={total}/>
          <StatisticLine name='Average' value={average || 0}/>
          <StatisticLine name='Positive' value={positive || 0}/>
        </tbody>
      </table>
    </div>
  );
}

const StatisticLine = ({name, value}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
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
        <Button key={feedback.name} 
                handleClick={feedback.handleClick} 
                name={feedback.name}/>
      )}
      <h1>Statistics</h1>
      <Statistics feedbacks={feedbacks}/>
    </div>
  );
}

export default App;
