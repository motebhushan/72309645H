import React from "react";
import StockCorrelation from "../components/StockCorrelation";

const Dashboard = () => (
  <div style={{ maxWidth: 600, margin: "2rem auto" }}>
    <h1>Stock Analytics Dashboard</h1>
    <StockCorrelation />
  </div>
);

export default Dashboard;