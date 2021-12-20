import { Item, Icon } from 'semantic-ui-react';

import { useStateValue } from '../state';
import { Entry, EntryType } from '../types';
import { assertNever } from '../utils/assertNever';

import HealthRatingBar from './HealthRatingBar';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryDetailsProps) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnoses.find((d) => d.code === code);

    if (diagnosis) {
      return diagnosis.name;
    }
  };

  const Description = () => {
    return (
      <Item.Description style={{ fontStyle: 'italic' }}>
        {entry.description}

        {entry.diagnosisCodes?.length && (
          <ul>
            {entry.diagnosisCodes?.map((diagnosisCode) => (
              <li key={diagnosisCode}>
                {diagnosisCode} {getDiagnosisName(diagnosisCode)}
              </li>
            ))}
          </ul>
        )}
      </Item.Description>
    );
  };

  switch (entry.type) {
    case EntryType.Hospital:
      return (
        <>
          <Item.Image size='small'>
            <Icon name='hospital' size='massive' />
          </Item.Image>
          <Item.Content>
            <Item.Header>Hospital {entry.date}</Item.Header>
            <Description />
            <p>
              Discharged on {entry.discharge.date} due to &quot;
              {entry.discharge.criteria}&quot;.
            </p>
          </Item.Content>
        </>
      );
    case EntryType.OccupationalHealthCare:
      return (
        <>
          <Item.Image size='small'>
            <Icon name='universal access' size='massive' />
          </Item.Image>
          <Item.Content>
            <Item.Header>OccupationalHealthCare {entry.date}</Item.Header>
            <Description />
            {entry.sickLeave?.startDate && (
              <p>
                Patient on sick leave from {entry.sickLeave.startDate} to{' '}
                {entry.sickLeave.endDate}.
              </p>
            )}
          </Item.Content>
        </>
      );
    case EntryType.HealthCheck:
      return (
        <>
          <Item.Image size='small'>
            <Icon name='doctor' size='massive' />
          </Item.Image>
          <Item.Content>
            <Item.Header>
              HealthCheck {entry.date}{' '}
              <HealthRatingBar
                rating={entry.healthCheckRating}
                showText={false}
              />
            </Item.Header>
            <Description />
          </Item.Content>
        </>
      );
    default:
      return assertNever(entry);
  }
};

export { EntryDetails };
