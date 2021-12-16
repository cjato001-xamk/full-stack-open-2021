import { FinnishSSN } from 'finnish-ssn';

import { Gender } from '../types/Gender';
import { EntryDischarge, EntrySickLeave, EntryType } from '../types/Entry';
import {
  isString,
  isArray,
  isDate,
  isGender,
  isEntryType,
  isEntrySickLeave,
  isEntryDischarge,
  isHealthCheckRating,
} from './typeGuards';
import { HealthCheckRating } from '../types/HealthCheckRating';

/** Patient validators */

export const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}.`);
  }

  return name;
};

export const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !FinnishSSN.validate(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}.`);
  }

  return ssn;
};

export const parseDateOfBirth = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing dateOfBirth: ${date}.`);
  }

  return date;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}.`);
  }

  return occupation;
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}.`);
  }

  return gender;
};

/** Entry validators */

export const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(`Incorrect or missing type: ${type}.`);
  }

  return type;
};

export const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}.`);
  }

  return description;
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}.`);
  }

  return date;
};

export const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist: ${specialist}.`);
  }

  return specialist;
};

export const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (!diagnosisCodes) return [];

  if (!isArray(diagnosisCodes)) {
    throw new Error(`Incorrect or missing diagnosisCodes: ${diagnosisCodes}.`);
  }

  return diagnosisCodes;
};

export const parseDischarge = (discharge: unknown): EntryDischarge => {
  if (!discharge || !isEntryDischarge(discharge)) {
    throw new Error(`Incorrect or missing discharge object: ${discharge}.`);
  }

  return discharge;
};

export const parseSickLeave = (sickLeave: unknown): EntrySickLeave => {
  if (!sickLeave || !isEntrySickLeave(sickLeave)) {
    throw new Error(`Incorrect or missing sickLeave object: ${sickLeave}.`);
  }

  return sickLeave;
};

export const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(`Incorrect or missing employerName: ${employerName}.`);
  }

  return employerName;
};

export const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!rating || !isString(rating) || !isHealthCheckRating(parseInt(rating))) {
    throw new Error(`Incorrect or missing rating: ${rating}.`);
  }

  return parseInt(rating);
};
