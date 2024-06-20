import React from "react";
import LottoInterpolation from "./components/LottoInterpolation/LottoInterpolation";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Interpolation model</h1>
      </header>
      <main>
        <LottoInterpolation />
      </main>
    </div>
  );
}

export default App;
