export const averagemodernIncrementalModel = (numbers, steps = 6) => {
  const allPredictions = [];

  for (let i = 1; i <= numbers.length; i++) {
    const subset = numbers.slice(0, i);
    const average =
      subset.reduce((sum, value) => sum + value, 0) / subset.length;
    const predictions = Array(steps).fill(Math.round(average));
    allPredictions.push(predictions);
  }

  return allPredictions;
};
