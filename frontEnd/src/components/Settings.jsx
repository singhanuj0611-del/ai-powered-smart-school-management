import React from "react";

const Settings = ({ settings, onChange }) => {
  const wrapperStyle = {
    background: "rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 24px 48px rgba(6, 12, 26, 0.48)",
    display: "grid",
    gap: "18px"
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <header>
        <h2 style={{ margin: 0, fontSize: "26px" }}>Settings & Preferences</h2>
        <p style={{ opacity: 0.65, marginTop: "6px" }}>
          Configure EduAI integrations and tailor the interface to your flow.
        </p>
      </header>

      <section style={wrapperStyle}>
        <div style={{ display: "grid", gap: "12px" }}>
          <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>
            EduAI API Key
          </label>
          <input
            value={settings.aiKey}
            onChange={(event) => onChange({ aiKey: event.target.value })}
            placeholder="sk-live-****"
            style={{
              borderRadius: "14px",
              padding: "14px",
              background: "rgba(10, 34, 78, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f8ff",
              fontSize: "15px"
            }}
          />
          <span style={{ opacity: 0.6, fontSize: "13px" }}>
            Stored locally only. EduAI uses it to personalize planning output.
          </span>
        </div>

        <ToggleRow
          label="Enable Dark Mode"
          description="Optimized gradients and neon highlights for late sessions."
          checked={settings.darkMode}
          onToggle={() => onChange({ darkMode: !settings.darkMode })}
        />

        <ToggleRow
          label="Weekly AI Reports"
          description="Receive a curated email summary of student progress on Fridays."
          checked={settings.autoReports}
          onToggle={() => onChange({ autoReports: !settings.autoReports })}
        />

        <ToggleRow
          label="Notify on Assignment Draft"
          description="Get a heads-up when AI generates ready-to-review assignments."
          checked={settings.notifications}
          onToggle={() => onChange({ notifications: !settings.notifications })}
        />
      </section>
    </div>
  );
};

const ToggleRow = ({ label, description, checked, onToggle }) => (
  <div
    style={{
      padding: "18px",
      borderRadius: "16px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px"
    }}
  >
    <div style={{ display: "grid", gap: "6px" }}>
      <strong style={{ fontSize: "16px" }}>{label}</strong>
      <span style={{ opacity: 0.6, fontSize: "14px" }}>{description}</span>
    </div>
    <button
      onClick={onToggle}
      style={{
        width: "66px",
        height: "32px",
        borderRadius: "999px",
        border: "none",
        background: checked
          ? "linear-gradient(90deg, rgba(110, 255, 200, 0.9), rgba(120, 200, 255, 0.9))"
          : "rgba(255, 255, 255, 0.12)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease"
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: checked ? "34px" : "6px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: "#0c1328",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
          transition: "left 0.3s ease"
        }}
      />
    </button>
  </div>
);

export default Settings;

