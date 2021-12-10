import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
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
        dispatch({
          type: 'ADD_OR_UPDATE_PATIENT',
          payload: patientDataFromApi,
        });
      } catch (e) {
        console.error(e);
      }
    };

    // If patient data does not have sensitive data,
    // then fetch full data from api
    if (!patients[id].ssn) {
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
    </>
  );
};

export { PatientPage };
