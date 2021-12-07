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
    0: 'Grrr.',
    2: 'Not too bad but, could be better!',
    4: 'Jei!',
    6: 'WOW!',
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

const parseArguments = (args: string[]) => {
  if (args.length < 2) throw new Error('Not enough arguments!');

  const [target, ...dailyExercices] = args;

  const parsedDailyExercices = dailyExercices.map((value) => {
    const number = +value;
    if (isNaN(number)) {
      throw new Error('Invalid input!');
    }
    return +value;
  });

  if (!isNaN(Number(target))) {
    return {
      target: +target,
      dailyExercices: parsedDailyExercices,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (process.argv.length > 2) {
  try {
    const { target, dailyExercices } = parseArguments(process.argv.slice(2));
    console.log(calculateExercises(dailyExercices, target));
  } catch (error) {
    console.log('Failed:' + error.message);
  }
}
