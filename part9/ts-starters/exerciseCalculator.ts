interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (
  periodLength: number,
  trainingDays: number,
  average: number,
  target: number,
  success: boolean
): { rating: number; ratingDescription: string } => {
  let rating = 0;

  if (success) {
    rating += 2;
  }

  if (average / target > 0.8) {
    rating += 2;
  }

  if (trainingDays / periodLength > 0.9) {
    rating += 2;
  }

  const descriptionMap: { [key: number]: string } = {
    2: 'Not too bad but, could be better!',
  };

  return { rating, ratingDescription: descriptionMap[rating] };
};

const calculateExercises = (
  dailyExercices: number[],
  target: number
): Result => {
  const periodLength = dailyExercices.length;
  const trainingDays = dailyExercices.filter((number) => number).length;
  const average =
    dailyExercices.reduce((a, b) => a + b, 0) / dailyExercices.length || 0;
  const success = average >= target;
  const { rating, ratingDescription } = getRating(
    periodLength,
    trainingDays,
    average,
    target,
    success
  );

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/**
 * Expected return
 *
 * {
 *   periodLength: 7,
 *   trainingDays: 5,
 *   success: false,
 *   rating: 2,
 *   ratingDescription: 'not too bad but could be better',
 *   target: 2,
 *   average: 1.9285714285714286
 * }
 */
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
