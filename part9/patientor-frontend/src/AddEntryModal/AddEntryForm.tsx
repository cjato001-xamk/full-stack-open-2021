import { useState, useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import { useStateValue } from '../state';
import { NewEntry, EntryType } from '../types';
import { assertNever } from '../utils/assertNever';

import {
  DiagnosisSelection,
  NumberField,
  SelectField,
  EntryTypeOption,
  TextField,
} from '../components/FormField';

const baseSchema = Yup.object().shape({
  description: Yup.string().required('Field is required.'),
  date: Yup.string()
    .trim()
    // Regexp grabbed from https://stackoverflow.com/a/22061799 (and modified)
    // Does not actually validate it's a date, so might still fail on backend
    .matches(
      /^(20)\d{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      'Invalid format.'
    )
    .required('Field is required.'),
  specialist: Yup.string().required('Field is required.'),
});

export type EntryFormValues = NewEntry;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  {
    value: EntryType.OccupationalHealthCare,
    label: 'Occupational Health Care',
  },
  { value: EntryType.HealthCheck, label: 'Health Check' },
  { value: EntryType.Hospital, label: 'Hospital' },
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const [selectedEntryType, setSelectedEntryType] = useState<EntryType>(
    EntryType.HealthCheck
  );
  const [validationSchema, setValidationSchema] = useState(baseSchema);

  let initialValues = {
    type: selectedEntryType,
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [],
  } as unknown as EntryFormValues;

  useEffect(() => {
    switch (selectedEntryType) {
      case EntryType.HealthCheck:
        initialValues = {
          ...initialValues,
          type: EntryType.HealthCheck,
          healthCheckRating: 1,
        };

        setValidationSchema(
          baseSchema.concat(
            Yup.object().shape({
              healthCheckRating: Yup.number()
                .min(0)
                .max(3)
                .required('Field is required.'),
            })
          )
        );
        break;

      case EntryType.OccupationalHealthCare:
        initialValues = {
          ...initialValues,
          type: EntryType.OccupationalHealthCare,
          employerName: '',
          sickLeave: {
            startDate: '',
            endDate: '',
          },
        };

        setValidationSchema(
          baseSchema.concat(
            Yup.object().shape({
              employerName: Yup.string().required('Field is required.'),
              sickLeave: Yup.object().shape({
                startDate: Yup.string()
                  .trim()
                  // Regexp grabbed from https://stackoverflow.com/a/22061799 (and modified)
                  // Does not actually validate it's a date, so might still fail on backend
                  .matches(
                    /^(20)\d{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    'Invalid format.'
                  ),
                endDate: Yup.string()
                  .trim()
                  // Regexp grabbed from https://stackoverflow.com/a/22061799 (and modified)
                  // Does not actually validate it's a date, so might still fail on backend
                  .matches(
                    /^(20)\d{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    'Invalid format.'
                  ),
              }),
            })
          )
        );
        break;

      case EntryType.Hospital:
        initialValues = {
          ...initialValues,
          type: EntryType.Hospital,
          discharge: {
            date: '',
            criteria: '',
          },
        };

        setValidationSchema(
          baseSchema.concat(
            Yup.object().shape({
              discharge: Yup.object().shape({
                date: Yup.string()
                  .trim()
                  // Regexp grabbed from https://stackoverflow.com/a/22061799 (and modified)
                  // Does not actually validate it's a date, so might still fail on backend
                  .matches(
                    /^(20)\d{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,
                    'Invalid format.'
                  )
                  .required('Field is required.'),
                criteria: Yup.string().required('Field is required.'),
              }),
            })
          )
        );
        break;

      default:
        assertNever(selectedEntryType);
    }
  }, [selectedEntryType]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        useEffect(() => {
          setSelectedEntryType(values.type);
        }, [values.type]);

        return (
          <Form className='form ui'>
            <SelectField<EntryTypeOption>
              name='type'
              label='Entry Type'
              options={entryTypeOptions}
            />

            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />

            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />

            <Field
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            {selectedEntryType === EntryType.HealthCheck && (
              <Field
                label='Health Check Rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {selectedEntryType === EntryType.OccupationalHealthCare && (
              <>
                <Field
                  label='Employer'
                  placeholder='Employer'
                  name='employerName'
                  component={TextField}
                />
                <Field
                  label='Sick leave start date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                />
                <Field
                  label='Sick leave end date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.endDate'
                  component={TextField}
                />
              </>
            )}

            {selectedEntryType === EntryType.Hospital && (
              <>
                <Field
                  label='Discharge date'
                  placeholder='YYYY-MM-DD'
                  name='discharge.date'
                  component={TextField}
                />
                <Field
                  label='Discharge criteria'
                  placeholder='Discharge criteria'
                  name='discharge.criteria'
                  component={TextField}
                />
              </>
            )}

            <Grid>
              <Grid.Column floated='left' width={5}>
                <Button type='button' onClick={onCancel} color='red'>
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                <Button
                  type='submit'
                  floated='right'
                  color='green'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export { AddEntryForm };
