import { genAI } from "../extension";
import { instruction } from "./utils";

const aiMessage = async (message: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      systemInstruction: instruction
    });

    const res = await model.generateContent(message);

    return res.response.text();

  } catch (error) {
    return "Hubo un error";
  }
};

export default aiMessage;