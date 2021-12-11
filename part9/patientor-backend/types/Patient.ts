import { Gender } from './Gender';
import { Entry } from './Entry';

type SensitivePatientFields = 'ssn';

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
