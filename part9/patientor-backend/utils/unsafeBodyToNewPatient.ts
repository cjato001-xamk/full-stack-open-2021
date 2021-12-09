import { NewPatient } from '../types/Patient';
import {
  parseName,
  parseSSN,
  parseDateOfBirth,
  parseOccupation,
  parseGender,
} from './validators';

const unsafeBodyToNewPatient = ({
  name,
  ssn,
  dateOfBirth,
  occupation,
  gender,
}: {
  name: unknown;
  ssn: unknown;
  dateOfBirth: unknown;
  occupation: unknown;
  gender: unknown;
}): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    ssn: parseSSN(ssn),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
  };

  return newPatient;
};

export { unsafeBodyToNewPatient };
