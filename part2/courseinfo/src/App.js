const Header = (props) => {

  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {

  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Content = (props) => { 
  
  return (
    <div>
      {props.parts.map(part => <Part part={part}/>)}
    </div>
  )
}

const Total = (props) => {

  let total = 0
  props.parts.forEach(element => {
    total += element.exercises
  });
  return (
    <p>
      Number of exercises {total}
    </p>
  )
}

const App = () => {
 
  const course = {
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
      }
    ]
  }
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;
