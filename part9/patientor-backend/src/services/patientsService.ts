import { patients } from '../../data/patients';
import { PatientWithoutSensitiveData } from '../../types/Patient';

const getPatientsWithoutSensitiveData = (): PatientWithoutSensitiveData[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const patientsService = {
  getPatientsWithoutSensitiveData,
};
