import { Patient } from '../types/Patient';
import { unsafeBodyToNewPatient } from '../utils/unsafeBodyToNewPatient';

const patientsData = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1986-08-02',
    ssn: '020886-9032',
    gender: 'male',
    occupation: 'New york city cop',
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-09-04',
    ssn: '040979-907F',
    gender: 'male',
    occupation: 'Cop',
  },
  {
    id: 'd27736ec-f723-11e9-8f0b-362b9e155667',
    name: 'Hans Gruber',
    dateOfBirth: '1970-11-12',
    ssn: '121170-995S',
    gender: 'male',
    occupation: 'Technician',
  },
  {
    id: 'd2773822-f723-11e9-8f0b-362b9e155667',
    name: 'Dana Scully',
    dateOfBirth: '1974-06-22',
    ssn: '220674-9880',
    gender: 'female',
    occupation: 'Forensic Pathologist',
  },
  {
    id: 'd2773c6e-f723-11e9-8f0b-362b9e155667',
    name: 'Matti Luukkainen',
    dateOfBirth: '1971-09-03',
    ssn: '030971-9217',
    gender: 'male',
    occupation: 'Digital evangelist',
  },
];

const patients: Patient[] = patientsData.map((obj) => {
  const object = unsafeBodyToNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

export { patients };
