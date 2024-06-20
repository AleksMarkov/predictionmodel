import * as d3 from "d3";

export const predictNextCombination = (numbers) => {
  const predicted = [];
  for (let i = 0; i < 6; i++) {
    const avg = d3.mean(numbers.filter((_, index) => index % 6 === i));
    predicted.push(Math.round(avg));
  }
  return predicted;
};
