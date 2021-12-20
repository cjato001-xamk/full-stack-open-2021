import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';

import { TextField, SelectField, GenderOption } from '../components/FormField';
import { Gender, Patient } from '../types';

const PatientSchema = Yup.object().shape({
  name: Yup.string().required('Field is required.'),
  ssn: Yup.string()
    .trim()
    // Validates only that the SSN "looks correct" - backend might still complain
    .matches(/^\d{6}[+\-A]\d{3}[a-zA-Z0-9]$/, 'Invalid format.')
    .required('Field is required.'),
  dateOfBirth: Yup.string()
    .trim()
    // Regexp grabbed from https://stackoverflow.com/a/22061799 (and modified)
    // Does not actually validate it's a date, so might still fail on backend
    .matches(
      /^(19|20)\d{2}-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,
      'Invalid format.'
    )
    .required('Field is required.'),
  occupation: Yup.string().required('Field is required.'),
});

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, 'id' | 'entries'>;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const genderOptions: GenderOption[] = [
  { value: Gender.Male, label: 'Male' },
  { value: Gender.Female, label: 'Female' },
  { value: Gender.Other, label: 'Other' },
];

export const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        name: '',
        ssn: '',
        dateOfBirth: '',
        occupation: '',
        gender: Gender.Other,
      }}
      onSubmit={onSubmit}
      validationSchema={PatientSchema}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Name'
              placeholder='Name'
              name='name'
              component={TextField}
            />
            <Field
              label='Social Security Number'
              placeholder='SSN'
              name='ssn'
              component={TextField}
            />
            <Field
              label='Date Of Birth'
              placeholder='YYYY-MM-DD'
              name='dateOfBirth'
              component={TextField}
            />
            <Field
              label='Occupation'
              placeholder='Occupation'
              name='occupation'
              component={TextField}
            />
            <SelectField<GenderOption>
              label='Gender'
              name='gender'
              options={genderOptions}
            />
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

export default AddPatientForm;
