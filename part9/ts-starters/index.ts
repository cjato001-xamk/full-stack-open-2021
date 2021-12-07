import express from 'express';

import { calculateBmi } from './bmiCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.json({
      error: 'Invalid parameters.',
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    weight,
    height,
    bmi,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
