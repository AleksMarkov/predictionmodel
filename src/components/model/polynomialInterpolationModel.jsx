import numeric from "numeric";

export const polynomialInterpolation = (numbers, degree = 2) => {
  const x = Array.from({ length: numbers.length }, (_, i) => i + 1);
  const y = numbers;

  const X = x.map((xi) =>
    Array.from({ length: degree + 1 }, (_, j) => Math.pow(xi, j))
  );
  const Y = y;

  const Xt = numeric.transpose(X);
  const XtX = numeric.dot(Xt, X);
  const XtY = numeric.dot(Xt, Y);

  const coeffs = numeric.solve(XtX, XtY);

  const predict = (x) => {
    return coeffs.reduce((sum, coeff, i) => sum + coeff * Math.pow(x, i), 0);
  };

  const n = 6;
  const predictions = Array.from({ length: n }, (_, i) =>
    predict(numbers.length + i + 1)
  );

  return predictions.map((value) => Math.round(value));
};
