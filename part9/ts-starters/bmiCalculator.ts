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

const height = +process.argv[2];
const weight = +process.argv[3];

if (!height || !weight) {
  throw new Error('Invalid input!');
}

console.log(calculateBmi(height, weight));
