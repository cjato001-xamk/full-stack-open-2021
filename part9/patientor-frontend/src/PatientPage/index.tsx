import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { useStateValue, addOrUpdatePatient } from '../state';
import { Patient } from '../types';

import { GenderIcon } from '../components/GenderIcon';

interface RouteParamProps {
  id: string;
}

const PatientPage = () => {
  const { id } = useParams<RouteParamProps>();

  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addOrUpdatePatient(patientDataFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    // If patient data does not have sensitive data,
    // then fetch full data from api
    if (!patients[id]?.ssn) {
      void fetchPatientData();
    }
  }, [id, dispatch]);

  if (!id || Object.keys(patients).length === 0) return null;

  return (
    <>
      <h2>
        {patients[id].name} <GenderIcon gender={patients[id].gender} />
      </h2>

      <ul>
        <li>SSN: {patients[id].ssn}</li>
        <li>Occupation: {patients[id].occupation}</li>
      </ul>

      <h4>Entries</h4>

      {patients[id].entries?.map((entry) => (
        <React.Fragment key={entry.date}>
          <p>
            {entry.date}{' '}
            <span style={{ fontStyle: 'italic' }}>{entry.description}</span>
          </p>

          <ul>
            {entry.diagnosisCodes?.map((diagnosisCode) => (
              <li key={diagnosisCode}>{diagnosisCode}</li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </>
  );
};

export { PatientPage };
