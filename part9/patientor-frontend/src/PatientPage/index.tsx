import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Item } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue, addOrUpdatePatient } from '../state';
import { Patient } from '../types';

import { GenderIcon } from '../components/GenderIcon';
import { EntryDetails } from '../components/EntryDetails';

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

      {patients[id]?.entries?.length !== 0 && (
        <>
          <h4>Entries</h4>

          <Item.Group>
            {patients[id].entries?.map((entry) => (
              <Item key={entry.date}>
                <EntryDetails entry={entry} />
              </Item>
            ))}
          </Item.Group>
        </>
      )}
    </>
  );
};

export { PatientPage };
