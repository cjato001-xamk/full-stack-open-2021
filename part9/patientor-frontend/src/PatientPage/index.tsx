import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Item, Button } from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue, addOrUpdatePatient } from '../state';
import { Patient } from '../types';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

import { GenderIcon } from '../components/GenderIcon';
import { EntryDetails } from '../components/EntryDetails';
import { AddEntryModal } from '../AddEntryModal';

interface RouteParamProps {
  id: string;
}

const PatientPage = () => {
  const { id } = useParams<RouteParamProps>();

  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const { data: patientDataFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addOrUpdatePatient(patientDataFromApi));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };

    // If patient data does not have sensitive data,
    // then fetch full data from api
    if (!patients[id]?.ssn) {
      void fetchPatientData();
    }
  }, [id, dispatch]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addOrUpdatePatient(updatedPatient));
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

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

      <Button onClick={() => openModal()}>Add New Entry</Button>

      {patients[id]?.entries?.length !== 0 && (
        <>
          <h4>Entries</h4>

          <Item.Group>
            {patients[id].entries?.map((entry, index) => (
              <Item key={`${entry.date}-${index}`}>
                <EntryDetails entry={entry} />
              </Item>
            ))}
          </Item.Group>
        </>
      )}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    </>
  );
};

export { PatientPage };
