import express, { Request, Response } from 'express';

import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({
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

app.post(
  '/exercises',
  (
    req: Omit<Request, 'body'> & {
      body: { daily_exercises?: string[]; target?: string };
    },
    res: Response
  ) => {
    const { daily_exercises: dailyExercises, target } = req.body;

    if (!dailyExercises || !target || dailyExercises.length === 0) {
      return res.status(400).json({
        error: 'Parameters missing!',
      });
    }

    if (
      isNaN(Number(target)) ||
      !dailyExercises.every((number: string) => !isNaN(Number(number)))
    ) {
      return res.status(400).json({
        error: 'Malformatted parameters.',
      });
    }

    const results = calculateExercises(
      dailyExercises.map((number: string) => Number(number)),
      Number(target)
    );

    return res.json(results);
  }
);

const PORT = 3002;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
