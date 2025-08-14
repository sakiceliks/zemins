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
  return visualizeEpoxyFloorFlow(input);
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
    const promptText = input.colorScheme 
      ? `Visualize this space with ${input.epoxyStyle} epoxy floor in ${input.colorScheme} colors.` 
      : `Visualize this space with ${input.epoxyStyle} epoxy floor.`;
    
    const {media, text} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: promptText},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {
      visualizedImage: media!.url,
      styleDescription: text || `${input.colorScheme ? ` ${input.colorScheme} renklerinde ${input.epoxyStyle} Uygulaması` : ''}`
    };
  }
);