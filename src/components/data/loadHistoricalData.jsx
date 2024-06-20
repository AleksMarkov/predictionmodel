import * as d3 from "d3";

export const loadHistoricalData = async () => {
  const response = await fetch("/data/lotto649_results.csv");
  const text = await response.text();
  const data = d3.csvParse(text);

  const historicalData = data.map((d) => ({
    drawDate: d["Draw Date"],
    regularNumbers: [
      +d["Regular Numbers 1"],
      +d["Regular Numbers 2"],
      +d["Regular Numbers 3"],
      +d["Regular Numbers 4"],
      +d["Regular Numbers 5"],
      +d["Regular Numbers 6"],
    ],
    bonus: +d["Bonus"],
  }));

  return historicalData;
};
