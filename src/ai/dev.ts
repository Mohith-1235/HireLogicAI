import { config } from 'dotenv';
config();

import '@/ai/flows/generate-custom-questionnaire.ts';
import '@/ai/flows/summarize-candidate-response.ts';
import '@/ai/flows/generate-interview-questions.ts';
