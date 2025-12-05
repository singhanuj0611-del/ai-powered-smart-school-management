import React, { useMemo, useState } from "react";
import Dashboard from "./components/Dashboard";
import StudentManagement from "./components/StudentManagement";
import AttendanceTracker from "./components/AttendanceTracker";
import LessonPlanner from "./components/LessonPlanner";
import AssignmentGenerator from "./components/AssignmentGenerator";
import Settings from "./components/Settings";
import AIChatAssistant from "./components/AIChatAssistant";

const modules = [
  { key: "dashboard", label: "Dashboard", component: Dashboard },
  { key: "students", label: "Students", component: StudentManagement },
  { key: "attendance", label: "Attendance", component: AttendanceTracker },
  { key: "lesson-planner", label: "Lesson Planner", component: LessonPlanner },
  { key: "assignment-generator", label: "Assignment Generator", component: AssignmentGenerator },
  { key: "settings", label: "Settings", component: Settings }
];

const App = () => {
  const [activeModuleKey, setActiveModuleKey] = useState("dashboard");
  const [settings, setSettings] = useState({
    aiKey: "",
    darkMode: true,
    autoReports: true,
    notifications: true
  });

  const ActiveComponent = useMemo(() => {
    const found = modules.find((module) => module.key === activeModuleKey);
    return found ? found.component : Dashboard;
  }, [activeModuleKey]);

  const isSettingsMode = activeModuleKey === "settings";

  const updateSettings = (partial) => {
    setSettings((previous) => ({ ...previous, ...partial }));
  };

  const navigateToSettings = () => setActiveModuleKey("settings");

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          settings.darkMode
            ? "radial-gradient(circle at 10% 20%, rgba(35, 70, 180, 0.4), transparent 60%), radial-gradient(circle at 90% 10%, rgba(250, 120, 255, 0.35), transparent 55%), linear-gradient(180deg, #040214 0%, #060b25 100%)"
            : "linear-gradient(180deg, #f5f8ff 0%, #dbe7ff 100%)",
        color: settings.darkMode ? "#f5f8ff" : "#0c1535",
        transition: "background 0.6s ease, color 0.4s ease",
        padding: "36px 42px 120px"
      }}
    >
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "32px"
        }}
      >
        <header
          style={{
            display: "grid",
            gap: "16px",
            background: settings.darkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0.75)",
            borderRadius: "24px",
            padding: "28px 32px",
            border: settings.darkMode
              ? "1px solid rgba(255, 255, 255, 0.12)"
              : "1px solid rgba(12, 30, 82, 0.12)",
            boxShadow: settings.darkMode
              ? "0 40px 80px rgba(6, 12, 30, 0.55)"
              : "0 30px 60px rgba(80, 120, 210, 0.25)",
            backdropFilter: "blur(20px)"
          }}
        >
          <div>
            <span
              style={{
                fontSize: "13px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                opacity: settings.darkMode ? 0.65 : 0.5
              }}
            >
              EduAI Platform
            </span>
            <h1
              style={{
                margin: "8px 0 0",
                fontSize: "36px",
                fontWeight: 600,
                letterSpacing: "-0.01em"
              }}
            >
              Smart School Management System
            </h1>
            <p
              style={{
                margin: "12px 0 0",
                maxWidth: "540px",
                opacity: settings.darkMode ? 0.72 : 0.68,
                lineHeight: 1.6
              }}
            >
              Save hours each week with AI-driven planning, automated assignments,
              and at-a-glance analytics—purpose-built for teachers and
              administrators.
            </p>
          </div>
          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            {modules.map((module) => {
              const isActive = module.key === activeModuleKey;
              return (
                <button
                  key={module.key}
                  onClick={() => setActiveModuleKey(module.key)}
                  style={{
                    padding: "12px 18px",
                    borderRadius: "999px",
                    border: "1px solid transparent",
                    background: isActive
                      ? "linear-gradient(135deg, rgba(120, 220, 255, 0.95), rgba(150, 160, 255, 0.95))"
                      : "rgba(255, 255, 255, 0.08)",
                    color: isActive ? "#040c22" : settings.darkMode ? "#f4f8ff" : "#172545",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    transition: "transform 0.25s ease, background 0.25s ease",
                    boxShadow: isActive
                      ? "0 16px 30px rgba(70, 120, 255, 0.45)"
                      : "0 8px 20px rgba(8, 14, 28, 0.35)"
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {module.label}
                </button>
              );
            })}
          </nav>
        </header>

        <section>
          {isSettingsMode ? (
            <Settings settings={settings} onChange={updateSettings} />
          ) : (
            <ActiveComponent
              settings={settings}
              onRequireKey={navigateToSettings}
            />
          )}
        </section>
      </main>

      <AIChatAssistant settings={settings} onRequireKey={navigateToSettings} />
    </div>
  );
};

export default App;

