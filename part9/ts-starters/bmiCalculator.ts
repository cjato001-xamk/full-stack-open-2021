const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return 'Underweight';
  }

  if (bmi > 25) {
    return 'Overweight';
  }

  return 'Normal (healthy weight)';
};

const parseArguments = (args: string[]) => {
  if (args.length !== 2) throw new Error('Invalid arguments!');

  const [height, weight] = args;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: +height,
      weight: +weight,
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (process.argv.length > 2) {
  try {
    const { height, weight } = parseArguments(process.argv.slice(2));
    // eslint-disable-next-line no-console
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    // eslint-disable-next-line no-console
    console.log(errorMessage);
  }
}

export { calculateBmi };
