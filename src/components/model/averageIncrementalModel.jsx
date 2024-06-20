export const averageIncrementalModel = (numbers, steps = 6) => {
  const predictions = [];
  for (let i = 1; i <= steps; i++) {
    const subset = numbers.slice(0, i);
    const average =
      subset.reduce((sum, value) => sum + value, 0) / subset.length;
    predictions.push(Math.round(average));
  }
  return predictions;
};
