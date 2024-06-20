export const conditionalProbabilityModel = (historicalData) => {
  const results = historicalData.map((draw) => {
    const randomIndexes = [];
    while (randomIndexes.length < 2) {
      const randomIndex = Math.floor(
        Math.random() * draw.regularNumbers.length
      );
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }
    const knownNumbers = [
      draw.regularNumbers[randomIndexes[0]],
      draw.regularNumbers[randomIndexes[1]],
    ];
    const remainingNumbers = draw.regularNumbers.filter(
      (num) => !knownNumbers.includes(num)
    );

    return {
      knownNumbers,
      remainingNumbers,
    };
  });

  return results;
};
