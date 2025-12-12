'use server';

/**
 * @fileOverview Visualizes how different epoxy floor styles would look in a user-uploaded photo.
 */


import {z} from 'genkit';
import { ai } from '../genkit';

const VisualizeEpoxyFloorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the space where the epoxy floor will be visualized, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  epoxyStyle: z.string().describe('The style of epoxy floor to visualize (e.g., metallic, quartz, flake, solid color)').default("metallic epoxy"),
  colorScheme: z.string().describe('Color scheme for the epoxy floor').optional(),
});
export type VisualizeEpoxyFloorInput = z.infer<typeof VisualizeEpoxyFloorInputSchema>;

const VisualizeEpoxyFloorOutputSchema = z.object({
  visualizedImage: z
    .string()    
    .describe("A data URI of the visualized image with the epoxy floor style applied."),
  styleDescription: z.string().describe("Description of the applied epoxy style")
});
export type VisualizeEpoxyFloorOutput = z.infer<typeof VisualizeEpoxyFloorOutputSchema>;

export async function visualizeEpoxyFloor(
  input: VisualizeEpoxyFloorInput
): Promise<VisualizeEpoxyFloorOutput> {
  try {
    return await visualizeEpoxyFloorFlow(input);
  } catch (error) {
    console.error('visualizeEpoxyFloor error:', error);
    // Re-throw to let the client handle it
    throw error;
  }
}

const epoxyPrompt = ai.definePrompt({
  name: 'visualizeEpoxyFloorPrompt',
  input: {schema: VisualizeEpoxyFloorInputSchema},
  output: {schema: VisualizeEpoxyFloorOutputSchema},
  prompt: `Visualize how the specified epoxy floor style would look in the provided space.

Epoxy Style: {{{epoxyStyle}}}
Color Scheme: {{colorScheme}}
Photo: {{media url=photoDataUri}}

Generate a photorealistic visualization of the epoxy floor in this space. Include:
- Accurate reflections based on lighting
- Realistic material texture
- Proper perspective and shadows
- Seamless integration with the existing space

Return the result as a data URI and a description of the style.`,  
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      }
    ],
  },
});

const visualizeEpoxyFloorFlow = ai.defineFlow(
  {
    name: 'visualizeEpoxyFloorFlow',
    inputSchema: VisualizeEpoxyFloorInputSchema,
    outputSchema: VisualizeEpoxyFloorOutputSchema,
  },
  async input => {
    try {
      // Input validation
      if (!input.photoDataUri || !input.photoDataUri.startsWith('data:')) {
        throw new Error('Geçersiz fotoğraf formatı. Lütfen geçerli bir görsel yükleyin.');
      }

      if (!input.epoxyStyle) {
        throw new Error('Epoxy stili seçilmedi.');
      }

      const promptText = input.colorScheme 
        ? `Bu mekana ${input.epoxyStyle} epoksi zemin ${input.colorScheme} renklerinde uygulandığında nasıl görüneceğini kısaca ve Türkçe olarak açıkla. Maksimum 2 cümle, sadece görsel özellikleri belirt.` 
        : `Bu mekana ${input.epoxyStyle} epoksi zemin uygulandığında nasıl görüneceğini kısaca ve Türkçe olarak açıkla. Maksimum 2 cümle, sadece görsel özellikleri belirt.`;
      
      // Gemini models support image analysis but not image generation
      // We'll use gemini-2.5-flash for image analysis and short Turkish description
      const result = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: [
          {media: {url: input.photoDataUri}},
          {text: promptText},
        ],
        config: {
          responseModalities: ['TEXT'],
        },
      });

      // Extract and format the description - keep it short and in Turkish
      let styleDescription = result.text || '';
      
      // If description is too long, truncate it
      if (styleDescription.length > 150) {
        styleDescription = styleDescription.substring(0, 147) + '...';
      }
      
      // Fallback if no description
      if (!styleDescription || styleDescription.trim().length === 0) {
        styleDescription = input.colorScheme 
          ? `${input.colorScheme} renklerinde ${input.epoxyStyle} uygulaması`
          : `${input.epoxyStyle} uygulaması`;
      }

      // Görsel işleme client-side'da yapılıyor, burada sadece açıklama döndürüyoruz
      // Client-side'da processEpoxyImage fonksiyonu görseli işleyecek
      return {
        visualizedImage: input.photoDataUri, // Client-side'da işlenecek
        styleDescription: styleDescription
      };
    } catch (error) {
      // Log the error for debugging
      console.error('Epoxy görselleştirme hatası:', error);
      
      // Re-throw with a user-friendly message
      if (error instanceof Error) {
        throw new Error(`Görselleştirme başarısız: ${error.message}`);
      }
      throw new Error('Görselleştirme sırasında beklenmeyen bir hata oluştu.');
    }
  }
);