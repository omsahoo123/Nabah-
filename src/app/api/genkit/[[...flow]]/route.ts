/**
 * @fileoverview This file creates a Next.js API route to handle Genkit flow requests.
 */

import {ai} from '@/ai/genkit';

export const POST = ai.getApiHandler();
