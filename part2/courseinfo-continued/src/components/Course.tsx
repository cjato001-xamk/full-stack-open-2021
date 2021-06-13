import { ICourse } from '../interfaces/ICourse'

import { Header } from './Header'
import { Content } from './Content'
import { Total } from './Total'

type CourseProps = {
  course: ICourse
}

const Course = ({ course }: CourseProps): JSX.Element => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export { Course }
