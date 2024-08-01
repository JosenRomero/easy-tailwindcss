import { generateText } from "ai";
import { genAI } from "../extension";
import { instruction } from "./utils";

const aiMessage = async (message: string): Promise<string> => {
  try {

    const { text } = await generateText({
      model: genAI('models/gemini-1.5-pro-latest'),
      system: instruction,
      prompt: message
    });

    return text;

  } catch (error) {
    throw error;
  }
};

export default aiMessage;