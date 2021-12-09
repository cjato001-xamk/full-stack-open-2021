import { CoursePart } from '../../types/CoursePart';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.type) {
    case 'normal':
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
        </div>
      );

    case 'groupProject':
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p>Project exercises {coursePart.groupProjectCount}</p>
        </div>
      );

    case 'submission':
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
          <p>Submit to: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );

    case 'special':
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
          <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
          <p>Required skills: {coursePart.requirements.join(', ')}</p>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export { Part };
