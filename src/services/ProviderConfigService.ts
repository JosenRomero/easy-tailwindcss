import { createGoogleGenerativeAI, GoogleGenerativeAIProvider } from "@ai-sdk/google";
import { AI_PROVIDERS } from '../models/IAmodels';

export let currentAI: GoogleGenerativeAIProvider;

export class ProviderConfigService {

  static createProvider(apiKey: string, currentIAmodel: AI_PROVIDERS) {
    
    try {

      switch (currentIAmodel) {
        case AI_PROVIDERS.GEMINI:
          currentAI = createGoogleGenerativeAI({ apiKey });
          break;
        default:
          throw new Error("Provider not supported");
      }

    } catch (error) {
      throw error;
    }

  }

}