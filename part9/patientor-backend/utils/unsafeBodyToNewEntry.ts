import { assertNever } from './assertNever';
import { EntryType, NewEntry } from '../types/Entry';
import {
  parseType,
  parseDescription,
  parseDate,
  parseSpecialist,
  parseDiagnosisCodes,
  parseDischarge,
  parseEmployerName,
  parseSickLeave,
  parseHealthCheckRating,
} from './validators';

const unsafeBodyToNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
  employerName,
  sickLeave,
  healthCheckRating,
}: {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  discharge?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  healthCheckRating?: unknown;
}): NewEntry => {
  const entry = {
    type: parseType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
  } as unknown as NewEntry;

  switch (entry.type) {
    case EntryType.Hospital:
      entry.discharge = parseDischarge(discharge);
      break;

    case EntryType.OccupationalHealthCare:
      entry.employerName = parseEmployerName(employerName);
      if (entry.sickLeave) {
        entry.sickLeave = parseSickLeave(sickLeave);
      }
      break;

    case EntryType.HealthCheck:
      entry.healthCheckRating = parseHealthCheckRating(healthCheckRating);
      break;

    default:
      return assertNever(entry);
  }

  return entry;
};

export { unsafeBodyToNewEntry };
