'use server';
/**
 * @fileoverview This file contains the implementation of a Genkit flow for text translation.
 * It exports the `translateText` function, along with its input and output types.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const TranslateTextInputSchema = z.object({
  texts: z.array(z.string()).describe('An array of texts to be translated.'),
  targetLanguage: z.string().describe('The target language code (e.g., "hi" for Hindi).'),
});
export type TranslateTextInput = z.infer<typeof TranslateTextInputSchema>;

export const TranslateTextOutputSchema = z.object({
  translatedTexts: z.array(z.string()).describe('An array of translated texts.'),
});
export type TranslateTextOutput = z.infer<typeof TranslateTextOutputSchema>;

export async function translateText(input: TranslateTextInput): Promise<TranslateTextOutput> {
  return translateTextFlow(input);
}

const translationPrompt = ai.definePrompt({
  name: 'translationPrompt',
  input: { schema: TranslateTextInputSchema },
  output: { schema: TranslateTextOutputSchema },
  prompt: `Translate the following texts to {{targetLanguage}}. Return only the translated texts in the same order.

Texts to translate:
{{#each texts}}
- {{{this}}}
{{/each}}
`,
});

const translateTextFlow = ai.defineFlow(
  {
    name: 'translateTextFlow',
    inputSchema: TranslateTextInputSchema,
    outputSchema: TranslateTextOutputSchema,
  },
  async (input) => {
    const { output } = await translationPrompt(input);
    return output!;
  }
);
