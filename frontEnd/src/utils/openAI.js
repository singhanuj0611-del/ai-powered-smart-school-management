export const chatCompletion = async ({
  apiKey,
  messages,
  model = "gpt-4o-mini",
  temperature = 0.7,
  maxTokens = 900
}) => {
  if (!apiKey) {
    throw new Error("Missing OpenAI API key");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to reach OpenAI");
  }

  return response.json();
};

export const extractMessage = (data) => {
  const content =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.message?.text ||
    "";
  return content.trim();
};

export const parseJSONContent = (rawContent) => {
  if (!rawContent) {
    throw new Error("Empty response content");
  }
  const cleaned = rawContent
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/, "")
    .trim();

  return JSON.parse(cleaned);
};

