import { ICoursePart } from '../../types/CoursePart';

import { CoursePart } from './CoursePart';

interface ContentProps {
  courseParts: ICoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <CoursePart coursePart={coursePart} key={coursePart.name} />
      ))}
    </>
  );
};

export { Content };
