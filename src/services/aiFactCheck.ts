import OpenAI from "openai"; // Use OpenAI directly

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeClaim(input: string): Promise<{
  verdict: string;
  explanation: string;
  sources: { name: string; link: string }[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Fact-check the following statement: "${input}". Provide results in the following format:
  {
    "verdict": "true/false/neither",
    "explanation": "Detailed explanation",
    "sources": [
      { "name": "Source name", "link": "https://source-link.com" }
    ]
  }`,
        },
      ],
    });

    const message = response.choices?.[0]?.message?.content;

    if (message) {
      const result = JSON.parse(message);
      return {
        verdict: result.verdict,
        explanation: result.explanation,
        sources: result.sources || [],
      };
    } else {
      throw new Error("No response from AI");
    }
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw error;
  }
}
