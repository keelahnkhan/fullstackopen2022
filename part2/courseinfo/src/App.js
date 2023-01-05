const Header = ({courseName}) => {

  return (
    <h1>{courseName}</h1>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}/>
      <Content content={course.content}/>
      <Total content={course.content}/>
    </div>
  );
};

const Part = (props) => {

  return (
    <p>{props.part.name} {props.part.exercises}</p>
  );
};

const Content = ({content}) => { 
  
  return (
    <div>
      {content.map(part => <Part key={part.id} part={part}/>)}
    </div>
  );
};

const Total = ({content}) => {

  let total = content.reduce((accum, curr) => accum + curr.exercises, 0);
  return (
    <p style={{fontWeight: 'bold'}}>
      Total of {total} exercises
    </p>
  );
};

const App = () => {
 
  const course = {
    id: 1,
    name: 'Half Stack application development',
    content: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };
  
  return <Course course={course}/>;
}

export default App;
