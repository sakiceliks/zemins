import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Check if API key is configured
if (!process.env.GOOGLE_GENAI_API_KEY && !process.env.GEMINI_API_KEY) {
  console.warn('Google AI API key not found. Please set GOOGLE_GENAI_API_KEY or GEMINI_API_KEY environment variable.');
}

/**
 * Varsayılan model:
 * - Ücretsiz katmanda genellikle en sorunsuz seçenek "Flash" sınıfıdır.
 * - Gerekirse ortam değişkeni ile override edilebilir.
 */
export const DEFAULT_GOOGLEAI_MODEL =
  process.env.GENKIT_MODEL ||
  process.env.GOOGLEAI_MODEL ||
  'googleai/gemini-2.0-flash';

export const ai = genkit({
  plugins: [googleAI()],
  model: DEFAULT_GOOGLEAI_MODEL,
});
