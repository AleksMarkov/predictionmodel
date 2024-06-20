import * as d3 from "d3";

export const splineInterpolation = (numbers) => {
  // Количество предсказанных значений
  const n = 6;

  // Индексы для существующих данных
  const x = d3.range(numbers.length);
  const y = numbers;

  // Шкала для интерполяции
  const xScale = d3
    .scaleLinear()
    .domain([0, numbers.length - 1])
    .range([0, n - 1]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(numbers)])
    .range([d3.min(numbers), d3.max(numbers)]);

  // Создание интерполяционной функции
  const spline = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveBasis);

  // Генерация предсказанных значений
  const interpolatedValues = [];
  for (let i = 0; i < n; i++) {
    const t = (numbers.length - 1) * (i / (n - 1));
    const value = spline(t);
    interpolatedValues.push(value);
  }

  // Округление предсказанных значений до целых чисел
  return interpolatedValues.map((value) => Math.round(value));
};
