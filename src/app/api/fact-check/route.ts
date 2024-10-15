import { analyzeClaim } from "../../../services/aiFactCheck"; // Import the service

export async function POST(req: Request) {
  const { input } = await req.json();

  if (!input || input.trim() === "") {
    return new Response(
      JSON.stringify({
        message: "Input is empty or invalid. Please provide a valid phrase.",
      }),
      { status: 400 }
    );
  }

  // Call the AI fact-check function
  const { verdict, explanation, sources } = await analyzeClaim(input); // Destructure the AI response

  return new Response(
    JSON.stringify({
      message: "Fact-check completed!",
      verdict, // Send the verdict (true/false/neither)
      explanation, // Send the explanation
      sources, // Send the sources array
    }),
    { status: 200 }
  );
}
