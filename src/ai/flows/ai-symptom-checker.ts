'use server';
/**
 * @fileOverview This file defines an AI symptom checker flow.
 *
 * - aiSymptomChecker - A function that takes a list of symptoms and returns potential causes.
 * - AISymptomCheckerInput - The input type for the aiSymptomChecker function.
 * - AISymptomCheckerOutput - The return type for the aiSymptomChecker function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomCheckerInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A comma-separated list of symptoms the user is experiencing.'),
});
export type AISymptomCheckerInput = z.infer<typeof AISymptomCheckerInputSchema>;

const AISymptomCheckerOutputSchema = z.object({
  potentialCauses: z
    .string()
    .describe(
      'A list of potential causes for the symptoms, along with a disclaimer that this is not a substitute for professional medical advice.'
    ),
});
export type AISymptomCheckerOutput = z.infer<typeof AISymptomCheckerOutputSchema>;

export async function aiSymptomChecker(input: AISymptomCheckerInput): Promise<AISymptomCheckerOutput> {
  return aiSymptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomCheckerPrompt',
  input: {schema: AISymptomCheckerInputSchema},
  output: {schema: AISymptomCheckerOutputSchema},
  prompt: `You are an AI symptom checker that provides potential causes for a list of symptoms.

Symptoms: {{{symptoms}}}

Potential Causes: Provide a list of potential causes for the symptoms, along with a disclaimer that this is not a substitute for professional medical advice.`,
});

const aiSymptomCheckerFlow = ai.defineFlow(
  {
    name: 'aiSymptomCheckerFlow',
    inputSchema: AISymptomCheckerInputSchema,
    outputSchema: AISymptomCheckerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
