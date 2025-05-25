
export const queryAI = async (question: string): Promise<string> => {
  try {
    const response = await fetch(
      "http://127.0.0.1:3001/api/v1/prediction/4e7c92fe-6dd8-41d7-b2f2-328461935a95",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "question": question,
          "overrideConfig": {
            "sessionId": "user",
          }
        })
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result.text || "I apologize, but I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error querying AI:", error);
    throw error;
  }
};
