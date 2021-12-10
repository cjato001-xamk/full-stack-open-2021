import { v4 as uuid } from 'uuid';

import { patients } from '../../data/patients';
import {
  Patient,
  NewPatient,
  PatientWithoutSensitiveData,
} from '../../types/Patient';

const getPatientsWithoutSensitiveData = (): PatientWithoutSensitiveData[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (patientId: string): Patient | undefined => {
  return patients.find((patient) => patient.id === patientId);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export const patientsService = {
  getPatientsWithoutSensitiveData,
  getPatient,
  addPatient,
};
