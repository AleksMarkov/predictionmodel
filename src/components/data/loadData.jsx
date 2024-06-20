import * as d3 from "d3";

export const loadData = () => {
  return d3.csv("/data/lotto649_results.csv").then((data) => {
    return data.map((d) => {
      return {
        RegularNumbers: [
          parseInt(d["Regular Numbers 1"], 10),
          parseInt(d["Regular Numbers 2"], 10),
          parseInt(d["Regular Numbers 3"], 10),
          parseInt(d["Regular Numbers 4"], 10),
          parseInt(d["Regular Numbers 5"], 10),
          parseInt(d["Regular Numbers 6"], 10),
        ],
        Bonus: parseInt(d.Bonus, 10),
      };
    });
  });
};
