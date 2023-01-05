

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

export default Course;