export const geminiChat = async ({
  apiKey,
  prompt,
  model = "gemini-pro",
  temperature = 0.7,
  maxTokens = 900
}) => {
  if (!apiKey) {
    throw new Error("Missing Gemini API key");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens
        }
      })
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to reach Gemini API");
  }

  return response.json();
};

export const extractGeminiMessage = (data) => {
  const content =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    data?.candidates?.[0]?.text ||
    "";
  return content.trim();
};

