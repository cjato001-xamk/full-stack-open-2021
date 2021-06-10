interface IPart {
  name: string
  exercises: number
}

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>
}

const Content = ({ parts }: { parts: IPart[] }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  )
}

const Part = ({ part }: { part: IPart }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = ({ parts }: { parts: IPart[] }) => {
  return (
    <p>
      Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export { App }
