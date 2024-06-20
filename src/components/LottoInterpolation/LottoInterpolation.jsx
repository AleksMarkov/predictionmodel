import React, { useEffect, useState } from "react";
import {
  Container,
  ChartContainer,
  TableContainer,
  ToggleButton,
} from "./LottoInterpolation.styled";
import { loadData } from "../data/loadData";
import { predictNextCombination } from "../model/interpolationModel";
import { linearInterpolation } from "../model/linearInterpolationModel";
import { polynomialInterpolation } from "../model/polynomialInterpolationModel";
import { splineInterpolation } from "../model/splineInterpolationModel";
import { exponentialSmoothing } from "../model/exponentialSmoothingModel";
import { averageIncrementalModel } from "../model/averageIncrementalModel";
import { averagemodernIncrementalModel } from "../model/averagemodernIncrementalModel";
import * as d3 from "d3";

const LottoInterpolation = () => {
  const [data, setData] = useState([]);
  const [predicted, setPredicted] = useState([]);
  const [showData, setShowData] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [interpolationMethod, setInterpolationMethod] = useState("average");

  useEffect(() => {
    loadData()
      .then((parsedData) => {
        setData(parsedData);
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, []);

  useEffect(() => {
    if (showGraph && data.length > 0) {
      const numbers = data.flatMap((d) => d.RegularNumbers);
      let allPredictions;
      if (interpolationMethod === "average") {
        allPredictions = [predictNextCombination(numbers)];
      } else if (interpolationMethod === "linear") {
        allPredictions = [linearInterpolation(numbers)];
      } else if (interpolationMethod === "polynomial") {
        allPredictions = [polynomialInterpolation(numbers)];
      } else if (interpolationMethod === "spline") {
        allPredictions = [splineInterpolation(numbers)];
      } else if (interpolationMethod === "exponentialSmoothing") {
        allPredictions = [exponentialSmoothing(numbers)];
      } else if (interpolationMethod === "averageIncremental") {
        allPredictions = [averageIncrementalModel(numbers)];
      } else if (interpolationMethod === "averagemodernIncremental") {
        allPredictions = averagemodernIncrementalModel(numbers);
      }

      // Вычисление окончательного предсказания на основе всех промежуточных предсказаний
      const finalPrediction = allPredictions[allPredictions.length - 1];
      setPredicted(finalPrediction);

      const margin = { top: 20, right: 30, bottom: 30, left: 50 };
      const width = 900 - margin.left - margin.right;
      const height = 450 - margin.top - margin.bottom;

      const x = d3
        .scaleBand()
        .domain(d3.range(6))
        .range([0, width])
        .padding(0.1);
      const y = d3
        .scaleLinear()
        .domain([0, d3.max(finalPrediction)])
        .range([height, 0]);

      const svg = d3
        .select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      svg.selectAll("*").remove(); // Clear previous contents

      svg
        .selectAll(".bar")
        .data(finalPrediction)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(i))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y(d))
        .attr("height", (d) => height - y(d));

      svg
        .selectAll(".label")
        .data(finalPrediction)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d, i) => x(i) + x.bandwidth() / 2)
        .attr("y", (d) => y(d) - 18) // поднимаем текст на 20 пикселей выше
        .attr("dy", ".75em")
        .attr("text-anchor", "middle")
        .text((d) => d);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).tickFormat((d, i) => i + 1));

      svg.append("g").call(d3.axisLeft(y));
    }
  }, [data, showGraph, interpolationMethod]);

  return (
    <Container>
      <ToggleButton onClick={() => setInterpolationMethod("average")}>
        Average
      </ToggleButton>
      <ToggleButton onClick={() => setInterpolationMethod("linear")}>
        Linear
      </ToggleButton>
      <ToggleButton onClick={() => setInterpolationMethod("polynomial")}>
        Polynomial
      </ToggleButton>
      <ToggleButton onClick={() => setInterpolationMethod("spline")}>
        Spline
      </ToggleButton>
      <ToggleButton
        onClick={() => setInterpolationMethod("exponentialSmoothing")}
      >
        Exponential Smoothing
      </ToggleButton>
      <ToggleButton
        onClick={() => setInterpolationMethod("averageIncremental")}
      >
        Average Incremental
      </ToggleButton>
      <ToggleButton
        onClick={() => setInterpolationMethod("averagemodernIncremental")}
      >
        Average Modern Incremental
      </ToggleButton>
      <ToggleButton onClick={() => setShowGraph(!showGraph)}>
        {showGraph ? "Hide Graph" : "Show Graph"}
      </ToggleButton>
      {showGraph && (
        <>
          <ChartContainer>
            <svg id="chart"></svg>
          </ChartContainer>
          <div>
            <h3>Predicted Next Combination:</h3>
            <p>{predicted.join(", ")}</p>
          </div>
        </>
      )}
      <ToggleButton onClick={() => setShowData(!showData)}>
        {showData ? "Hide Loaded Data" : "Show Loaded Data"}
      </ToggleButton>
      {showData && (
        <TableContainer>
          <h3>Loaded Data:</h3>
          <table>
            <thead>
              <tr>
                <th>Regular Numbers</th>
                <th>Bonus</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr key={index}>
                  <td>{d.RegularNumbers.join(", ")}</td>
                  <td>{d.Bonus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      )}
    </Container>
  );
};

export default LottoInterpolation;
