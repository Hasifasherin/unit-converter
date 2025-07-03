import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const categories = {
    Length: ["Meter", "Kilometer", "Centimeter", "Inch", "Foot"],
    Weight: ["Kilogram", "Gram", "Pound", "Ounce"],
    Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  };

  const [category, setCategory] = useState("Length");
  const [fromUnit, setFromUnit] = useState(categories["Length"][0]);
  const [toUnit, setToUnit] = useState(categories["Length"][1]);
  const [value, setValue] = useState("");
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setFromUnit(categories[category][0]);
    setToUnit(categories[category][1]);
    setValue("");
    setResult(null);
  }, [category]);

  useEffect(() => {
    if (value === "") {
      setResult(null);
      return;
    }

    const convertLength = (value, from, to) => {
      const toMeters = {
        Meter: 1,
        Kilometer: 1000,
        Centimeter: 0.01,
        Inch: 0.0254,
        Foot: 0.3048,
      };
      const inMeters = parseFloat(value) * toMeters[from];
      return inMeters / toMeters[to];
    };

    const convertWeight = (value, from, to) => {
      const toKg = {
        Kilogram: 1,
        Gram: 0.001,
        Pound: 0.453592,
        Ounce: 0.0283495,
      };
      const inKg = parseFloat(value) * toKg[from];
      return inKg / toKg[to];
    };

    const convertTemperature = (value, from, to) => {
      value = parseFloat(value);
      if (from === to) return value;

      let celsius;
      if (from === "Fahrenheit") celsius = (value - 32) * (5 / 9);
      else if (from === "Kelvin") celsius = value - 273.15;
      else celsius = value;

      if (to === "Fahrenheit") return celsius * (9 / 5) + 32;
      else if (to === "Kelvin") return celsius + 273.15;
      else return celsius;
    };

    let res;
    if (category === "Length") res = convertLength(value, fromUnit, toUnit);
    else if (category === "Weight") res = convertWeight(value, fromUnit, toUnit);
    else res = convertTemperature(value, fromUnit, toUnit);

    setResult(res.toFixed(4));
  }, [value, fromUnit, toUnit, category]);

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>🔄 Universal Unit Converter</h1>

      <div className="form-group">
        <label>Choose Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Enter Value:</label>
        <input
          type="number"
          placeholder="Enter value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>From Unit:</label>
        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
          {categories[category].map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>To Unit:</label>
        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
          {categories[category].map((unit) => (
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
