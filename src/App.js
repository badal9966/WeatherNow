import React from "react";
import NavBar from "./NavBar";
import Weather from "./Weather";

function App() {
  return (
    <div style={{
      minHeight: "calc(100vh - 16px)",   // This sets the min-height
      overflow: "hidden",     // disables scroll
      background: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Segoe UI', Arial, sans-serif"
    }}>
      <NavBar />
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        paddingTop: "calc(2rem + 64px)", // or just "paddingTop: '80px'"
        overflow: "hidden"     // disables scroll on inner container too
      }}>
        <Weather />
      </div>
    </div>
  );
}

export default App;
