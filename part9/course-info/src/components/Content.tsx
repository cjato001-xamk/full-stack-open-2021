import { CoursePart } from '../../types/CoursePart';

import { Part } from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part coursePart={coursePart} key={coursePart.name} />
      ))}
    </>
  );
};

export { Content };
