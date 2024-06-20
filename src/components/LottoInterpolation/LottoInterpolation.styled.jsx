import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const ChartContainer = styled.div`
  margin-top: 20px;
`;

export const TableContainer = styled.div`
  margin-top: 20px;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export const ToggleButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }

  &:focus {
    outline: none;
  }
`;
