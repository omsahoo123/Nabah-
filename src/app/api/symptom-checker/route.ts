'use server';

import {NextRequest, NextResponse} from 'next/server';
import {
  VertexAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google-cloud/vertexai';

// Initialize Vertex AI
const vertex_ai = new VertexAI({
  project: process.env.GOOGLE_CLOUD_PROJECT || '',
  location: process.env.GOOGLE_CLOUD_LOCATION || '',
});

const model = 'gemini-1.5-flash-001';

// Instantiate the model
const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

export async function POST(req: NextRequest) {
  try {
    const {symptoms} = await req.json();

    if (!symptoms) {
      return NextResponse.json(
        {error: 'Symptoms are required'},
        {status: 400}
      );
    }

    const prompt = `You are an AI symptom checker that provides potential causes for a list of symptoms.

Symptoms: ${symptoms}

Potential Causes: Provide a list of potential causes for the symptoms, formatted as a markdown list. End with a clear disclaimer that this is not a substitute for professional medical advice and the user should consult a doctor.`;

    const request = {
      contents: [{role: 'user', parts: [{text: prompt}]}],
    };

    const result = await generativeModel.generateContent(request);
    const responseText =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({potentialCauses: responseText});
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json(
      {error: 'Internal Server Error'},
      {status: 500}
    );
  }
}
