import { chatCompletion, extractMessage, parseJSONContent } from "./openAI";
import { geminiChat, extractGeminiMessage } from "./gemini";

/**
 * Unified AI service with fallback chain: OpenAI -> Gemini -> Dummy Data
 */
export const generateAIResponse = async ({
  openAIKey,
  geminiKey,
  messages,
  prompt,
  model = "gpt-4o-mini",
  temperature = 0.7,
  maxTokens = 900,
  dummyDataGenerator
}) => {
  // Try OpenAI first
  if (openAIKey) {
    try {
      const data = await chatCompletion({
        apiKey: openAIKey,
        messages,
        model,
        temperature,
        maxTokens
      });
      const content = extractMessage(data);
      return { success: true, content, source: "openai" };
    } catch (error) {
      console.warn("OpenAI failed, trying Gemini:", error.message);
    }
  }

  // Fallback to Gemini
  if (geminiKey) {
    try {
      // Convert messages to a single prompt for Gemini
      const geminiPrompt = messages
        ? messages
            .map((msg) => `${msg.role === "system" ? "System" : msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
            .join("\n\n")
        : prompt;

      const data = await geminiChat({
        apiKey: geminiKey,
        prompt: geminiPrompt,
        temperature,
        maxTokens
      });
      const content = extractGeminiMessage(data);
      return { success: true, content, source: "gemini" };
    } catch (error) {
      console.warn("Gemini failed, using dummy data:", error.message);
    }
  }

  // Final fallback to dummy data
  if (dummyDataGenerator) {
    const dummyContent = dummyDataGenerator();
    return { success: true, content: dummyContent, source: "dummy" };
  }

  throw new Error("No AI service available and no dummy data generator provided");
};

/**
 * Generate AI response and parse as JSON
 */
export const generateAIJSON = async ({
  openAIKey,
  geminiKey,
  messages,
  prompt,
  model = "gpt-4o-mini",
  temperature = 0.7,
  maxTokens = 900,
  dummyDataGenerator
}) => {
  const result = await generateAIResponse({
    openAIKey,
    geminiKey,
    messages,
    prompt,
    model,
    temperature,
    maxTokens,
    dummyDataGenerator
  });

  if (result.source === "dummy" && typeof result.content === "object") {
    return { ...result.content, _source: result.source };
  }

  try {
    const parsed = parseJSONContent(result.content);
    return { ...parsed, _source: result.source };
  } catch (error) {
    // If parsing fails and we have dummy data, use it
    if (dummyDataGenerator) {
      const dummy = dummyDataGenerator();
      const dummyObj = typeof dummy === "object" ? dummy : parseJSONContent(dummy);
      return { ...dummyObj, _source: "dummy" };
    }
    throw error;
  }
};

