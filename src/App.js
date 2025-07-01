import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const units = ["Meter", "Kilometer", "Centimeter", "Inch", "Foot"];

  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const toMeters = {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Inch: 0.0254,
      Foot: 0.3048,
    };

    const convert = (val, from, to) => {
      if (val === "" || isNaN(val)) return null;
      const inMeters = parseFloat(val) * toMeters[from];
      const finalValue = inMeters / toMeters[to];
      return finalValue.toFixed(4);
    };

    const res = convert(value, fromUnit, toUnit);
    setResult(res);
  }, [value, fromUnit, toUnit]);

  return (
    <div className="container">
      <h1>🌟 Unit Converter</h1>

      <div className="form-group">
        <label>Enter Value:</label>
        <input
          type="number"
          placeholder="Enter a number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>From Unit:</label>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>To Unit:</label>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {units.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div className="preview">
        {value && result !== null && (
          <p>
            <strong>{value}</strong> {fromUnit} = <strong>{result}</strong> {toUnit}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
