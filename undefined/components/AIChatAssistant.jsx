import React, { useState } from "react";
import { generateAIResponse } from "../utils/aiService";

const AIChatAssistant = ({ settings, onRequireKey }) => {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm EduAI. Ask me for lesson ideas, curriculum tweaks, or engagement tips."
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState("");

  const generateDummyResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("lesson") || lowerMessage.includes("plan")) {
      return "Here's a quick lesson idea: Start with a hook question, then use a think-pair-share activity, followed by a hands-on exploration. Wrap up with an exit ticket for quick assessment!";
    }
    if (lowerMessage.includes("engagement") || lowerMessage.includes("motivate")) {
      return "Try gamification! Use points, badges, or a class leaderboard. Also consider real-world connections—show students how the topic applies to their interests.";
    }
    if (lowerMessage.includes("differentiation") || lowerMessage.includes("diverse")) {
      return "Differentiate by offering multiple entry points: visual learners get diagrams, kinesthetic learners get hands-on activities, and auditory learners get discussions.";
    }
    return "Great question! Here are some ideas: Use collaborative learning, incorporate technology tools, and provide timely feedback. Want more specific tips? Ask about any teaching challenge!";
  };

  const sendMessage = async () => {
    if (isTyping) {
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    if (!settings?.aiKey && !settings?.geminiKey) {
      setError("Add at least one API key (OpenAI or Gemini) in Settings to chat with EduAI.");
      onRequireKey?.();
      return;
    }

    const userMessage = { role: "user", content: trimmed };
    const updatedHistory = [...history, userMessage];
    setHistory(updatedHistory);
    setInput("");
    setIsTyping(true);
    setError("");

    try {
      const result = await generateAIResponse({
        openAIKey: settings?.aiKey,
        geminiKey: settings?.geminiKey,
        temperature: 0.6,
        maxTokens: 350,
        messages: [
          {
            role: "system",
            content:
              "You are EduAI, an enthusiastic teaching coach for educators. Respond with concise, encouraging guidance packed with actionable ideas. Use bullets when helpful."
          },
          ...updatedHistory
        ],
        dummyDataGenerator: () => generateDummyResponse(trimmed)
      });

      const assistantContent =
        result.content ||
        "Here's a fresh idea: try a quick collaborative brainstorm to kick things off.";

      setHistory((previous) => [
        ...previous,
        { role: "assistant", content: assistantContent }
      ]);
    } catch (caughtError) {
      setError("EduAI couldn't be reached. Using fallback response.");
      const fallbackResponse = generateDummyResponse(trimmed);
      setHistory((previous) => [
        ...previous,
        {
          role: "assistant",
          content: fallbackResponse
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        right: "24px",
        bottom: "24px",
        width: open ? "320px" : "80px",
        height: open ? "420px" : "80px",
        borderRadius: open ? "24px" : "999px",
        background: "rgba(8, 18, 45, 0.92)",
        boxShadow: "0 28px 64px rgba(0, 0, 0, 0.55)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(22px)",
        transition: "all 0.35s cubic-bezier(0.19, 1, 0.22, 1)",
        overflow: "hidden",
        zIndex: 999
      }}
    >
      <button
        onClick={() => setOpen((previous) => !previous)}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "40px",
          height: "40px",
          borderRadius: "999px",
          border: "none",
          background:
            "linear-gradient(135deg, rgba(117, 212, 255, 0.9), rgba(146, 129, 255, 0.9))",
          color: "#050b18",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 14px 30px rgba(29, 105, 255, 0.45)"
        }}
      >
        {open ? "–" : "AI"}
      </button>

      {open ? (
        <div
          style={{
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            height: "100%"
          }}
        >
          <header style={{ padding: "18px 20px 0" }}>
            <h3 style={{ margin: 0, fontSize: "18px" }}>AI Coach</h3>
            <span style={{ fontSize: "13px", opacity: 0.65 }}>
              Always-on lesson whisperer ✨
            </span>
          </header>
          <div
            style={{
              padding: "18px 20px",
              display: "grid",
              gap: "12px",
              overflowY: "auto"
            }}
          >
            {history.map((message, index) => {
              const isAssistant = message.role === "assistant";
              return (
                <div
                  key={`${message.role}-${index}`}
                  style={{
                    justifySelf: isAssistant ? "start" : "end",
                    background: isAssistant
                      ? "rgba(255, 255, 255, 0.08)"
                      : "linear-gradient(135deg, rgba(117, 212, 255, 0.9), rgba(146, 129, 255, 0.9))",
                    color: isAssistant ? "#f4f6ff" : "#041327",
                    padding: "12px 14px",
                    borderRadius: "16px",
                    maxWidth: "82%",
                    boxShadow: "0 18px 32px rgba(8, 16, 40, 0.45)",
                    fontSize: "14px",
                    lineHeight: 1.5,
                    whiteSpace: "pre-wrap"
                  }}
                >
                  {message.content}
                </div>
              );
            })}
            {isTyping && (
              <div
                style={{
                  justifySelf: "start",
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#f4f6ff",
                  padding: "10px 14px",
                  borderRadius: "16px",
                  boxShadow: "0 12px 24px rgba(8, 16, 40, 0.45)",
                  fontSize: "13px",
                  letterSpacing: "0.04em"
                }}
              >
                EduAI is thinking...
              </div>
            )}
          </div>
          <div
            style={{
              padding: "12px 20px 20px",
              display: "flex",
              gap: "10px",
              alignItems: "center"
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask for a creative hook..."
              style={{
                flex: 1,
                borderRadius: "14px",
                padding: "12px 14px",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                background: "rgba(10, 30, 70, 0.78)",
                color: "#f5f9ff",
                fontSize: "14px"
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                borderRadius: "14px",
                padding: "12px 16px",
                border: "none",
                background:
                  "linear-gradient(135deg, rgba(255, 188, 150, 0.9), rgba(255, 126, 213, 0.9))",
                color: "#080d1b",
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              disabled={isTyping}
              onMouseEnter={(event) => {
                if (isTyping) {
                  return;
                }
                event.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {isTyping ? "..." : "Send"}
            </button>
          </div>
          {error && (
            <div
              style={{
                padding: "0 20px 14px",
                fontSize: "12px",
                color: "#ffb3c7",
                letterSpacing: "0.03em"
              }}
            >
              {error}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f6f7ff",
            fontWeight: 600,
            letterSpacing: "0.08em"
          }}
        >
          EduAI
        </div>
      )}
    </div>
  );
};

export default AIChatAssistant;

