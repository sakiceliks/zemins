import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if API key is configured
if (!process.env.GOOGLE_GENAI_API_KEY && !process.env.GEMINI_API_KEY) {
  console.warn('Google AI API key not found. Please set GOOGLE_GENAI_API_KEY or GEMINI_API_KEY environment variable.');
}

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
