import { Gender } from './Gender';

type SensitivePatientFields = 'ssn';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSensitiveData = Omit<Patient, SensitivePatientFields>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
