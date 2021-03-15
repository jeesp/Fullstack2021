const Course = ({ course }) => {
    return (
      <div>
        <Header coursename={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts.map(part => part.exercises)} />
      </div>
    )
  }
  const Header = ({ coursename }) => {
    return (
      <h2>{coursename}</h2>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
    )
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <p> {name} {exercises} </p>
    )
  }
  
  const Total = ({ parts }) => {
  
    return (
      <strong>Total of  {parts.reduce((total, current) => total + current)} exercises</strong>
    )
  }

  export default Course