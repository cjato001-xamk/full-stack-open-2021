import { ICoursePart } from '../../types/CoursePart';

interface CoursePartProps {
  coursePart: ICoursePart;
}

const CoursePart = ({ coursePart }: CoursePartProps) => {
  return (
    <p>
      {coursePart.name} {coursePart.exerciseCount}
    </p>
  );
};

export { CoursePart };
