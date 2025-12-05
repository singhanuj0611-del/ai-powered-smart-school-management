import React from "react";
import { attendance } from "../data/mockData";

const AttendanceTracker = () => {
  const containerStyle = {
    background: "rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    padding: "24px",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 26px 48px rgba(10, 18, 40, 0.45)",
    display: "grid",
    gap: "20px"
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <header>
        <h2 style={{ margin: 0, fontSize: "26px" }}>Attendance Tracking</h2>
        <p style={{ opacity: 0.65, marginTop: "6px" }}>
          A quick pulse on weekly class participation with visual cues.
        </p>
      </header>

      <section style={containerStyle}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "16px"
          }}
        >
          {attendance.map((slot) => (
            <div
              key={slot.day}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(64, 186, 255, 0.22), rgba(174, 130, 255, 0.2))",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                display: "grid",
                gap: "8px",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  opacity: 0.7
                }}
              >
                {slot.day}
              </span>
              <strong style={{ fontSize: "26px" }}>{slot.present}</strong>
              <span style={{ fontSize: "13px", color: "#8fffd2" }}>
                Present • {slot.absent} absent
              </span>
              <div
                style={{
                  height: "6px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.12)",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(slot.present / (slot.present + slot.absent)) * 100}%`,
                    background:
                      "linear-gradient(90deg, rgba(120, 255, 214, 0.9), rgba(120, 179, 255, 0.9))",
                    transition: "width 0.6s ease"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gap: "10px",
            padding: "18px",
            borderRadius: "16px",
            background: "rgba(10, 32, 78, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)"
          }}
        >
          <h3 style={{ margin: 0, fontSize: "20px" }}>Attendance Notes</h3>
          <p style={{ margin: 0, opacity: 0.7 }}>
            EduAI flags Wednesdays as a watch-day: consider scheduling a quick
            collaborative activity or gamified quiz to keep the momentum high.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AttendanceTracker;

