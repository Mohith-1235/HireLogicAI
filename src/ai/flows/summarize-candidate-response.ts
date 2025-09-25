'use server';
/**
 * @fileOverview Summarizes a candidate's response to a question.
 *
 * - summarizeCandidateResponse - A function that summarizes the response.
 * - SummarizeCandidateResponseInput - The input type for the summarizeCandidateResponse function.
 * - SummarizeCandidateResponseOutput - The return type for the summarizeCandidateResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeCandidateResponseInputSchema = z.object({
  candidateResponse: z
    .string()
    .describe('The candidate response to be summarized.'),
});
export type SummarizeCandidateResponseInput =
  z.infer<typeof SummarizeCandidateResponseInputSchema>;

const SummarizeCandidateResponseOutputSchema = z.object({
  summary: z.string().describe('The summary of the candidate response.'),
});
export type SummarizeCandidateResponseOutput =
  z.infer<typeof SummarizeCandidateResponseOutputSchema>;

export async function summarizeCandidateResponse(
  input: SummarizeCandidateResponseInput
): Promise<SummarizeCandidateResponseOutput> {
  return summarizeCandidateResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeCandidateResponsePrompt',
  input: {schema: SummarizeCandidateResponseInputSchema},
  output: {schema: SummarizeCandidateResponseOutputSchema},
  prompt: `Summarize the following candidate response: {{{candidateResponse}}}`,
});

const summarizeCandidateResponseFlow = ai.defineFlow(
  {
    name: 'summarizeCandidateResponseFlow',
    inputSchema: SummarizeCandidateResponseInputSchema,
    outputSchema: SummarizeCandidateResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
