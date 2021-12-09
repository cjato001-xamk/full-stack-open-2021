import { FinnishSSN } from 'finnish-ssn';

import { Gender } from '../types/Gender';
import { isString, isDate, isGender } from './typeGuards';

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
