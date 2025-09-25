'use server';

import { generateCustomQuestionnaire } from '@/ai/flows/generate-custom-questionnaire';
import { generateInterviewQuestions } from '@/ai/flows/generate-interview-questions';
import { z } from 'zod';

const questionnaireSchema = z.object({
  jobDescription: z.string().min(50, 'Job description must be at least 50 characters long.'),
});

export async function handleGenerateQuestionnaire(
  prevState: {
    message: string;
    questionnaire?: string;
  },
  formData: FormData
) {
  const validatedFields = questionnaireSchema.safeParse({
    jobDescription: formData.get('jobDescription'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Error: ' + validatedFields.error.flatten().fieldErrors.jobDescription?.join(', '),
    };
  }

  try {
    const result = await generateCustomQuestionnaire({
      jobDescription: validatedFields.data.jobDescription,
    });
    
    if (result.questionnaire) {
        return { message: 'success', questionnaire: result.questionnaire };
    } else {
        return { message: 'Error: Failed to generate questionnaire.' };
    }
  } catch (error) {
    console.error(error);
    return { message: 'Error: An unexpected error occurred on the server.' };
  }
}

const interviewQuestionsSchema = z.object({
  resume: z.string(),
  role: z.string(),
});

export async function handleGenerateInterviewQuestions(
  input: z.infer<typeof interviewQuestionsSchema>
) {
  const validatedFields = interviewQuestionsSchema.safeParse(input);

  if (!validatedFields.success) {
    throw new Error('Invalid input for generating interview questions.');
  }

  try {
    const result = await generateInterviewQuestions(validatedFields.data);
    return result.questions;
  } catch (error) {
    console.error(error);
    return ['There was an error generating questions. Please try again.'];
  }
}
