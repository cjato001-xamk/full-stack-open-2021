export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthCare',
  Hospital = 'Hospital',
}

export type EntrySickLeave = {
  startDate: string;
  endDate: string;
};

export type EntryDischarge = {
  date: string;
  criteria: string;
};

interface BaseEntry {
  id: string;
  type: EntryType;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  description: string;
  sickLeave?: EntrySickLeave;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  description: string;
  discharge: EntryDischarge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthCareEntry
  | HealthCheckEntry;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property
export type NewEntry = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries?: Entry[];
}
