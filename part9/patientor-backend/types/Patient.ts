type SensitivePatientFields = 'ssn';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientWithoutSensitiveData = Omit<Patient, SensitivePatientFields>;
