import { Gender } from './Gender';

type SensitivePatientFields = 'ssn';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientWithoutSensitiveData = Omit<Patient, SensitivePatientFields>;

export type NewPatient = Omit<Patient, 'id'>;
