import React, { useState } from "react";
import {
  chatCompletion,
  extractMessage,
  parseJSONContent
} from "../utils/openAI";

const LessonPlanner = ({ settings, onRequireKey }) => {
  const [form, setForm] = useState({
    subject: "Science",
    topic: "Solar System",
    grade: "7"
  });
  const [plan, setPlan] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const generatePlan = async (event) => {
    event.preventDefault();

    if (isThinking) {
      return;
    }

    if (!settings?.aiKey) {
      setError("Add your OpenAI API key in Settings to generate lesson plans.");
      onRequireKey?.();
      return;
    }

    setError("");
    setIsThinking(true);
    try {
      const data = await chatCompletion({
        apiKey: settings.aiKey,
        maxTokens: 600,
        temperature: 0.8,
        messages: [
          {
            role: "system",
            content:
              "You are EduAI, an instructional designer for K12 classrooms. Reply with pure JSON using keys objectives, materials, activities, assessment. Each value must be an array of 3-4 engaging bullet strings that emphasise active learning, collaboration, and formative assessment."
          },
          {
            role: "user",
            content: `Create an AI-assisted lesson plan.\nSubject: ${form.subject}\nTopic: ${form.topic}\nGrade Level: ${form.grade}\nHighlight: student engagement, differentiation, technology integration, and formative assessment.\nRespond only with JSON.`
          }
        ]
      });

      const content = extractMessage(data);
      const parsedPlan = parseJSONContent(content);
      setPlan(parsedPlan);
    } catch (caughtError) {
      setError(
        caughtError?.message?.includes("JSON")
          ? "EduAI responded in an unexpected format. Try again."
          : "We couldn’t reach EduAI. Please check your API key or try again."
      );
    } finally {
      setIsThinking(false);
    }
  };

  const panelStyle = {
    background: "rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 30px 56px rgba(6, 14, 36, 0.55)"
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <header>
        <h2 style={{ margin: 0, fontSize: "26px" }}>AI Lesson Planner</h2>
        <p style={{ opacity: 0.65, marginTop: "6px" }}>
          Generate ready-to-teach plans packed with objectives, activities, and
          assessments crafted by EduAI.
        </p>
      </header>

      <form
        style={{
          ...panelStyle,
          display: "grid",
          gap: "16px"
        }}
        onSubmit={generatePlan}
      >
        <div style={{ display: "grid", gap: "6px" }}>
          <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            style={{
              borderRadius: "14px",
              padding: "14px",
              background: "rgba(10, 34, 78, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f8ff",
              fontSize: "15px"
            }}
          />
        </div>
        <div style={{ display: "grid", gap: "6px" }}>
          <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>Topic</label>
          <input
            name="topic"
            value={form.topic}
            onChange={handleChange}
            style={{
              borderRadius: "14px",
              padding: "14px",
              background: "rgba(10, 34, 78, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f8ff",
              fontSize: "15px"
            }}
          />
        </div>
        <div style={{ display: "grid", gap: "6px" }}>
          <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>
            Grade Level
          </label>
          <select
            name="grade"
            value={form.grade}
            onChange={handleChange}
            style={{
              borderRadius: "14px",
              padding: "14px",
              background: "rgba(10, 34, 78, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f8ff",
              fontSize: "15px"
            }}
          >
            <option value="6">Grade 6</option>
            <option value="7">Grade 7</option>
            <option value="8">Grade 8</option>
            <option value="9">Grade 9</option>
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            type="submit"
            style={{
              marginTop: "8px",
              borderRadius: "14px",
              padding: "14px",
              border: "none",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "0.04em",
              background:
                "linear-gradient(90deg, rgba(123, 223, 255, 0.9), rgba(166, 120, 255, 0.9))",
              color: "#051127",
              cursor: isThinking ? "wait" : "pointer",
              transition: "transform 0.25s ease"
            }}
            disabled={isThinking}
            onMouseEnter={(event) => {
              if (isThinking) {
                return;
              }
              event.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {isThinking ? "Generating..." : "Create Lesson Plan"}
          </button>
          {error && (
            <span
              style={{
                fontSize: "12px",
                color: "#ffb8cc",
                letterSpacing: "0.03em"
              }}
            >
              {error}
            </span>
          )}
        </div>
      </form>

      {plan && (
        <section
          style={{
            ...panelStyle,
            background: "rgba(11, 28, 68, 0.8)",
            display: "grid",
            gap: "16px"
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "22px" }}>
              {form.subject} • {form.topic} • Grade {form.grade}
            </h3>
            <p style={{ margin: "6px 0 0", opacity: 0.65 }}>
              Crafted in seconds by EduAI.
            </p>
          </div>
          <div style={{ display: "grid", gap: "12px" }}>
            <SectionBlock title="Learning Objectives" items={plan.objectives} />
            <SectionBlock title="Materials Required" items={plan.materials} />
            <SectionBlock title="Engaging Activities" items={plan.activities} />
            <SectionBlock title="Assessment Methods" items={plan.assessment} />
          </div>
        </section>
      )}
    </div>
  );
};

const SectionBlock = ({ title, items }) => (
  <div
    style={{
      padding: "18px",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.04)",
      display: "grid",
      gap: "8px"
    }}
  >
    <h4 style={{ margin: 0, letterSpacing: "0.08em", opacity: 0.7 }}>{title}</h4>
    <ul style={{ margin: 0, paddingLeft: "18px", lineHeight: 1.6 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default LessonPlanner;

