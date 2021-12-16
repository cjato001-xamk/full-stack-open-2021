import { Gender } from '../types/Gender';
import { EntryDischarge, EntrySickLeave, EntryType } from '../types/Entry';
import { HealthCheckRating } from '../types/HealthCheckRating';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isArray = (data: unknown): data is string[] => {
  return data instanceof Array;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  const values = Object.values(Gender);
  return values.includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryType = (param: any): param is EntryType => {
  const values = Object.values(EntryType);
  return values.includes(param);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntrySickLeave = (object: any): object is EntrySickLeave => {
  const validStart = isDate(object.startDate);
  const validEnd = isDate(object.endDate);
  return validStart && validEnd;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryDischarge = (object: any): object is EntryDischarge => {
  const validDate = isDate(object.date);
  const validCriteria = isString(object.criteria);
  return validDate && validCriteria;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  const values = Object.values(HealthCheckRating);
  return values.includes(param);
};
