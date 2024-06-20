export const exponentialSmoothing = (numbers, alpha = 0.5) => {
  let smoothed = [numbers[0]]; // начальное значение

  for (let i = 1; i < numbers.length; i++) {
    smoothed.push(alpha * numbers[i] + (1 - alpha) * smoothed[i - 1]);
  }

  const n = 6;
  const predictions = [];
  let lastSmoothed = smoothed[smoothed.length - 1];

  for (let i = 0; i < n; i++) {
    predictions.push(lastSmoothed);
    lastSmoothed = alpha * lastSmoothed + (1 - alpha) * lastSmoothed;
  }

  return predictions.map((value) => Math.round(value));
};
