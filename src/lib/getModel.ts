import { type LanguageModel } from "ai";
import { AI_PROVIDERS } from "../models/IAmodels";
import { currentAI } from "../services/ProviderConfigService";

export const getModel = (currentModel: AI_PROVIDERS): LanguageModel => {

  try {

    switch (currentModel) {
      case AI_PROVIDERS.GEMINI:
        return currentAI('models/gemini-1.5-pro-latest');
      default:
        throw new Error("Provider not supported");
    }
    
  } catch (error) {
    throw error;
  }

};