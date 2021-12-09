import { v4 as uuid } from 'uuid';

import { patients } from '../../data/patients';
import {
  Patient,
  NewPatient,
  PatientWithoutSensitiveData,
} from '../../types/Patient';

const getPatientsWithoutSensitiveData = (): PatientWithoutSensitiveData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export const patientsService = {
  getPatientsWithoutSensitiveData,
  addPatient,
};
