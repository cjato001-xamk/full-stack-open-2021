import express from 'express';

import { patientsService } from '../services/patientsService';
import { unsafeBodyToNewPatient } from '../../utils/unsafeBodyToNewPatient';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getPatientsWithoutSensitiveData());
});

patientsRouter.get('/:id', (req, res) => {
  res.send(patientsService.getPatientWithoutSensitiveData(req.params.id));
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
