import express from 'express';

import { patientsService } from '../services/patientsService';
import { unsafeBodyToNewEntry } from '../../utils/unsafeBodyToNewEntry';
import { unsafeBodyToNewPatient } from '../../utils/unsafeBodyToNewPatient';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSensitiveData());
});

patientsRouter.get('/:id', (req, res) => {
  res.send(patientsService.getPatient(req.params.id));
});

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry = unsafeBodyToNewEntry(req.body);
    const updatedPatient = patientsService.addEntry(req.params.id, newEntry);
    res.json(updatedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = unsafeBodyToNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export { patientsRouter };
