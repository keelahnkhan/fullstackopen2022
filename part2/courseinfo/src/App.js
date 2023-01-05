const Header = ({courseName}) => (
  <h1>{courseName}</h1>
);

const Course = ({course}) => (
  <div>
    <Header courseName={course.name} />
    <Parts parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

const Part = ({part}) => (
  <p>{part.name} {part.exercises}</p>
);

const Parts = ({parts}) => { 
  return (
      <div>
        {parts.map(part => <Part key={part.id} part={part}/>)}
      </div>
  );
};

const Total = ({parts}) => {

  let total = parts.reduce((accum, curr) => accum + curr.exercises, 0);
  return (
    <p style={{fontWeight: 'bold'}}>
      Total of {total} exercises
    </p>
  );
};

const App = () => {
 
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];
  
  return (
    <>
      {courses.map((course) => <Course key={course.id} course={course}/>)}
    </>
  );
}

export default App;