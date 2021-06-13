import { IPart } from '../interfaces/IPart'

type TotalProps = {
  parts: IPart[]
}

const Total = ({ parts }: TotalProps): JSX.Element => {
  return (
    <p>
      Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises
    </p>
  )
}

export { Total }
