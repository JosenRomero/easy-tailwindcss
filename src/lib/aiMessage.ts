import { generateText } from "ai";
import { AI_PROVIDERS } from "../models/IAmodels";
import { instruction } from "./utils";
import { getModel } from "./getModel";

const aiMessage = async (message: string, currentModel: AI_PROVIDERS): Promise<string> => {
  try {

    const { text } = await generateText({
      model: getModel(currentModel),
      system: instruction,
      prompt: message
    });

    return text;

  } catch (error) {
    throw error;
  }
};

export default aiMessage;