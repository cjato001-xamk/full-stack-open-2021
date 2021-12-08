import { diagnoses } from '../../data/diagnoses';

const getDiagnoses = () => {
  return diagnoses;
};

export const diagnosesService = {
  getDiagnoses,
};
