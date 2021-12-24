const sumValues = (...values: Array<number>): number =>
  values.reduce((acc: number, curr: number) => acc + curr, 0);

export const getAverage = (...rates: Array<number>): number =>
  Math.round((sumValues(...rates) / rates.length) * 100) / 100;
