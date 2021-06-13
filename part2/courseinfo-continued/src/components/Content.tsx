import { IPart } from '../interfaces/IPart'

import { Part } from './Part'

const Content = ({ parts }: { parts: IPart[] }): JSX.Element => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  )
}

export { Content }
