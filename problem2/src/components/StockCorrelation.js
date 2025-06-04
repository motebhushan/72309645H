import React, { useState } from "react";
import { getStockCorrelation } from "../api/stockApi";

const StockCorrelation = () => {
  const [minutes, setMinutes] = useState(50);
  const [ticker1, setTicker1] = useState("NVDA");
  const [ticker2, setTicker2] = useState("AAPL");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await getStockCorrelation(minutes, ticker1, ticker2);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="correlation-widget">
      <h2>Stock Correlation</h2>
      <div>
        <label>Minutes: </label>
        <input type="number" value={minutes} onChange={e => setMinutes(e.target.value)} min={1} />
      </div>
      <div>
        <label>Ticker 1: </label>
        <input value={ticker1} onChange={e => setTicker1(e.target.value.toUpperCase())} />
      </div>
      <div>
        <label>Ticker 2: </label>
        <input value={ticker2} onChange={e => setTicker2(e.target.value.toUpperCase())} />
      </div>
      <button onClick={handleFetch} disabled={loading}>
        {loading ? "Loading..." : "Get Correlation"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 16 }}>
          <div><b>Correlation:</b> {result.correlation?.toFixed(4)}</div>
          <pre style={{ background: "#f4f4f4", padding: 10 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default StockCorrelation;