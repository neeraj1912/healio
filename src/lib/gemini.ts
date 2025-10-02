// export async function sendToGemini(message: string, personality: string) {
//   // Call Gemini API using fetch or Axios
//   // Return AI response
//   return "This is a placeholder response from Gemini"
// }

export async function gemini(message: string): Promise<string> {
  // Implement your Gemini API call here
  return "This is a placeholder response from Gemini";
}

const response = await gemini("How do I stay productive?")
