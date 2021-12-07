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

/**
 * Expected return
 *
 * Normal (healthy weight)
 */
console.log(calculateBmi(180, 74));
