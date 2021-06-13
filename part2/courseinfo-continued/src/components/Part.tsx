import { IPart } from '../interfaces/IPart'

type PartProps = {
  part: IPart
}

const Part = ({ part }: PartProps): JSX.Element => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

export { Part }
