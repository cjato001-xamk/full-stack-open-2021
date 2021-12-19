import { useEffect } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Form, Field } from 'formik';

import { useStateValue } from '../state';
import { NewEntry, EntryType } from '../types';

import {
  DiagnosisSelection,
  NumberField,
  SelectField,
  EntryTypeOption,
  TextField,
} from '../components/FormField';

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

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === EntryType.HealthCheck) {
          if (!values.healthCheckRating && values.healthCheckRating !== 0) {
            errors.healthCheckRating = requiredError;
          }
        }
        // if (values.type === EntryType.Hospital) {
        //   if (!values.discharge.date) {
        //     // FIXME: Stupidness required
        //     (errors.discharge as unknown as EntryDischarge).date =
        //       requiredError;
        //   }
        //   if (!values.discharge.date) {
        //     // FIXME: Stupidness required
        //     (errors.discharge as unknown as EntryDischarge).criteria =
        //       requiredError;
        //   }
        // }
        // if(values.type === EntryType.OccupationalHealthCare) {
        //   if (values.sickLeave.startDate && !values.sickLeave.endDate) {
        //     errors.sickLeave.endDate = requiredError;
        //   }
        //   if (values.sickLeave.endDate && !values.sickLeave.startDate) {
        //     errors.sickLeave.startDate = requiredError;
        //   }
        // }

        return errors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
        touched,
        errors,
      }) => {
        useEffect(() => {
          console.log(values, touched, errors);
        }, [values, touched, errors]);
        // TODO: On values.type change, should undefine non-related fields
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

            {values.type === EntryType.HealthCheck && (
              <Field
                label='Health Check Rating'
                name='healthCheckRating'
                component={NumberField}
                min={0}
                max={3}
              />
            )}

            {values.type === EntryType.OccupationalHealthCare && (
              <>
                <Field
                  label='Employer'
                  placeholder='Employer'
                  name='employerName'
                  component={TextField}
                />
                {/** // TODO: SickLeave start (optional) */}
                <Field
                  label='Sick leave start date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                />
                {/** // TODO: SickLeave end (mandatory if start is set) */}
                <Field
                  label='Sick leave end date'
                  placeholder='YYYY-MM-DD'
                  name='sickLeave.startDate'
                  component={TextField}
                />
              </>
            )}

            {values.type === EntryType.Hospital && (
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
