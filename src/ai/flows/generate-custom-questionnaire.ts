// use server'

/**
 * @fileOverview This file defines a Genkit flow for generating custom interview questionnaires based on a job description.
 *
 * generateCustomQuestionnaire - A function that generates a draft interview questionnaire from a job description.
 * GenerateCustomQuestionnaireInput - The input type for the generateCustomQuestionnaire function.
 * GenerateCustomQuestionnaireOutput - The return type for the generateCustomQuestionnaire function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCustomQuestionnaireInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to generate the questionnaire from.'),
});
export type GenerateCustomQuestionnaireInput = z.infer<
  typeof GenerateCustomQuestionnaireInputSchema
>;

const GenerateCustomQuestionnaireOutputSchema = z.object({
  questionnaire: z
    .string()
    .describe('The generated interview questionnaire in markdown format.'),
});
export type GenerateCustomQuestionnaireOutput = z.infer<
  typeof GenerateCustomQuestionnaireOutputSchema
>;

export async function generateCustomQuestionnaire(
  input: GenerateCustomQuestionnaireInput
): Promise<GenerateCustomQuestionnaireOutput> {
  return generateCustomQuestionnaireFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCustomQuestionnairePrompt',
  input: {schema: GenerateCustomQuestionnaireInputSchema},
  output: {schema: GenerateCustomQuestionnaireOutputSchema},
  prompt: `You are an expert recruiter. Generate an interview questionnaire based on the following job description. The questionnaire should be in markdown format.\n\nJob Description: {{{jobDescription}}}`,
});

const generateCustomQuestionnaireFlow = ai.defineFlow(
  {
    name: 'generateCustomQuestionnaireFlow',
    inputSchema: GenerateCustomQuestionnaireInputSchema,
    outputSchema: GenerateCustomQuestionnaireOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
