export const linearInterpolation = (numbers) => {
  // Подготовка данных
  const n = 6;
  const x = Array.from({ length: numbers.length }, (_, i) => i + 1);

  // Функция линейной регрессии
  const linearRegression = (x, y) => {
    const n = x.length;
    const xMean = x.reduce((a, b) => a + b) / n;
    const yMean = y.reduce((a, b) => a + b) / n;
    const num = x
      .map((xi, i) => (xi - xMean) * (y[i] - yMean))
      .reduce((a, b) => a + b);
    const den = x.map((xi) => (xi - xMean) ** 2).reduce((a, b) => a + b);
    const slope = num / den;
    const intercept = yMean - slope * xMean;
    return { slope, intercept };
  };

  // Выполнение линейной регрессии
  const { slope, intercept } = linearRegression(x, numbers);

  // Предсказание значений
  const predictions = Array.from(
    { length: n },
    (_, i) => intercept + slope * (numbers.length + i + 1)
  );

  // Округление предсказанных значений до целых чисел
  return predictions.map((value) => Math.round(value));
};
