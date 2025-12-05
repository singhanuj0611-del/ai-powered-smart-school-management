import React, { useState } from "react";
import { generateAIJSON } from "../utils/aiService";

const difficultyPrompts = {
  Easy: [
    "Define the core idea in your own words.",
    "List two everyday examples.",
    "Explain why this idea matters."
  ],
  Medium: [
    "Compare this concept with a related idea.",
    "Solve a scenario applying this concept.",
    "Predict what happens when variables change."
  ],
  Hard: [
    "Design an experiment to validate the concept.",
    "Critique a misconception and correct it.",
    "Synthesize two ideas into a unique solution."
  ]
};

const AssignmentGenerator = ({ settings, onRequireKey }) => {
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("Linear Equations");
  const [difficulty, setDifficulty] = useState("Easy");
  const [questions, setQuestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [source, setSource] = useState("");

  const generateDummyQuestions = () => {
    const prompts = difficultyPrompts[difficulty];
    return {
      questions: prompts.map((prompt, index) => ({
        id: `${difficulty}-${index}`,
        question: `${index + 1}. ${prompt} for ${topic.toLowerCase()} in ${subject}.`,
        answer:
          index === 0
            ? "Answer focuses on the fundamental definition with one vivid example."
            : index === 1
            ? "Use structured reasoning and show each step clearly."
            : "Provide a reflective, insightful response referencing real data.",
        explanation:
          "EduAI suggests highlighting key vocabulary, scaffolding the response, and rewarding creative thinking."
      }))
    };
  };

  const generateQuestions = async (event) => {
    event.preventDefault();

    if (isGenerating) {
      return;
    }

    if (!settings?.aiKey && !settings?.geminiKey) {
      setError("Add at least one API key (OpenAI or Gemini) in Settings to generate assignments.");
      onRequireKey?.();
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const parsed = await generateAIJSON({
        openAIKey: settings?.aiKey,
        geminiKey: settings?.geminiKey,
        maxTokens: 700,
        temperature: 0.75,
        messages: [
          {
            role: "system",
            content:
              "You are EduAI, an assessment co-pilot for teachers. Respond with JSON only, structured as {\"questions\": [{\"question\": string, \"answer\": string, \"explanation\": string}]}. Provide 3 rigorous, classroom-ready prompts tailored to the request. Answers should be model solutions and explanations should describe the reasoning."
          },
          {
            role: "user",
            content: `Create ${difficulty.toLowerCase()} difficulty questions for ${subject}.\nFocus topic: ${topic}.\nProvide three questions with answers and explanations.\nUse concise, teacher-friendly phrasing.\nRespond with JSON only.`
          }
        ],
        dummyDataGenerator: generateDummyQuestions
      });

      if (!Array.isArray(parsed?.questions)) {
        throw new Error("JSON missing questions");
      }

      setQuestions(
        parsed.questions.map((item, index) => ({
          id: item.id || `${difficulty}-${index}`,
          question: item.question,
          answer: item.answer,
          explanation: item.explanation
        }))
      );
      setSource(parsed._source || "openai");
    } catch (caughtError) {
      setError(
        caughtError?.message?.includes("JSON")
          ? "EduAI sent an unexpected format. Using fallback data."
          : "Unable to reach EduAI. Using fallback data."
      );

      const dummyData = generateDummyQuestions();
      setQuestions(
        dummyData.questions.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
          explanation: item.explanation
        }))
      );
      setSource("dummy");
    } finally {
      setIsGenerating(false);
    }
  };

  const containerStyle = {
    background: "rgba(255, 255, 255, 0.07)",
    borderRadius: "18px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 28px 56px rgba(6, 16, 36, 0.55)"
  };

  return (
    <div style={{ display: "grid", gap: "18px" }}>
      <header>
        <h2 style={{ margin: 0, fontSize: "26px" }}>AI Assignment Generator</h2>
        <p style={{ opacity: 0.65, marginTop: "6px" }}>
          Build tailored question sets with answers and explanations instantly.
        </p>
      </header>

      <form
        style={{
          ...containerStyle,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          alignItems: "end"
        }}
        onSubmit={generateQuestions}
      >
        <Field
          label="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
        <Field
          label="Topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
        />
        <div style={{ display: "grid", gap: "6px" }}>
          <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            style={{
              borderRadius: "14px",
              padding: "14px",
              background: "rgba(10, 34, 78, 0.68)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              color: "#f5f8ff",
              fontSize: "15px"
            }}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            borderRadius: "14px",
            padding: "14px",
            border: "none",
            fontWeight: 600,
            fontSize: "16px",
            letterSpacing: "0.04em",
            background:
              "linear-gradient(90deg, rgba(255, 200, 135, 0.9), rgba(255, 140, 210, 0.9))",
            color: "#0a1024",
            cursor: "pointer",
            transition: "transform 0.25s ease"
          }}
          disabled={isGenerating}
          onMouseEnter={(event) => {
            if (isGenerating) {
              return;
            }
            event.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isGenerating ? "Assembling..." : "Generate"}
        </button>
      </form>

      {error && (
        <div
          style={{
            fontSize: "12px",
            color: "#ffb8cc",
            letterSpacing: "0.03em"
          }}
        >
          {error}
        </div>
      )}

      {questions.length > 0 && (
        <section
          style={{
            ...containerStyle,
            background: "rgba(11, 28, 68, 0.82)",
            display: "grid",
            gap: "16px"
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "22px" }}>
              {difficulty} • {subject} • {topic}
            </h3>
            <p style={{ margin: "6px 0 0", opacity: 0.65 }}>
              {source === "dummy" 
                ? "Sample questions (add API keys for AI-generated content)."
                : source === "gemini"
                ? "Generated by Google Gemini AI."
                : source === "openai"
                ? "Generated by OpenAI."
                : "EduAI delivers three levels with suggested answers."}
            </p>
          </div>
          {questions.map((question) => (
            <article
              key={question.id}
              style={{
                padding: "18px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                display: "grid",
                gap: "10px",
                transition: "transform 0.25s ease"
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.transform = "translateX(6px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <strong style={{ fontSize: "16px" }}>{question.question}</strong>
              <div>
                <span style={{ opacity: 0.6, fontSize: "13px" }}>Answer</span>
                <p style={{ margin: "6px 0 0" }}>{question.answer}</p>
              </div>
              <div>
                <span style={{ opacity: 0.6, fontSize: "13px" }}>Explanation</span>
                <p style={{ margin: "6px 0 0" }}>{question.explanation}</p>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange }) => (
  <div style={{ display: "grid", gap: "6px" }}>
    <label style={{ opacity: 0.7, letterSpacing: "0.05em" }}>{label}</label>
    <input
      value={value}
      onChange={onChange}
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
);

export default AssignmentGenerator;

