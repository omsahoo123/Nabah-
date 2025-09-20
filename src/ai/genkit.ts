'use server';
import {genkit, configureGenkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {next} from '@genkit-ai/next';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

configureGenkit({
  plugins: [next()],
});
