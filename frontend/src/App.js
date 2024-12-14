import React from "react";
import CardCarousel from "./components/CardCarousel";

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", margin: "20px 0", color: "#333" }}>
        Baby Growth Tracker
      </h1>
      <CardCarousel />
    </div>
  );
}

export default App;
