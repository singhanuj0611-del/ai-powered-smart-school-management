import React from "react";
import { metrics, aiSuggestions } from "../data/mockData";

const cardStyle = {
  background: "rgba(255, 255, 255, 0.08)",
  borderRadius: "18px",
  padding: "22px",
  boxShadow: "0 30px 60px rgba(8, 15, 35, 0.35)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease"
};

const Dashboard = () => {
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px"
        }}
      >
        {metrics.map((metric) => (
          <div
            key={metric.label}
            style={{
              ...cardStyle,
              cursor: "pointer"
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-6px)";
              event.currentTarget.style.boxShadow =
                "0 38px 60px rgba(18, 25, 45, 0.45)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
              event.currentTarget.style.boxShadow =
                "0 30px 60px rgba(8, 15, 35, 0.35)";
            }}
          >
            <div
              style={{
                fontSize: "14px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: 0.7
              }}
            >
              {metric.label}
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 600,
                marginTop: "12px",
                marginBottom: "4px"
              }}
            >
              {metric.value}
            </div>
            <div style={{ color: "#8fffd2", fontSize: "15px" }}>
              {metric.trend}
            </div>
          </div>
        ))}
      </section>

      <section
        style={{
          ...cardStyle,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}
      >
        <header style={{ gridColumn: "1 / -1" }}>
          <h2 style={{ margin: 0, fontSize: "24px" }}>AI Teaching Insights</h2>
          <p style={{ margin: "8px 0 0", opacity: 0.7, fontSize: "15px" }}>
            Quick inspiration generated from daily class performance signals.
          </p>
        </header>
        {aiSuggestions.map((tip, index) => (
          <div
            key={tip}
            style={{
              padding: "16px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, rgba(58, 104, 255, 0.25), rgba(207, 104, 255, 0.18))",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transform: `translateY(${index % 2 === 0 ? "0" : "6px"})`,
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = `translateY(${
                index % 2 === 0 ? "0" : "6px"
              })`;
            }}
          >
            <div
              style={{
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                opacity: 0.6
              }}
            >
              Suggestion {index + 1}
            </div>
            <p style={{ margin: "10px 0 0", lineHeight: 1.6 }}>{tip}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Dashboard;

