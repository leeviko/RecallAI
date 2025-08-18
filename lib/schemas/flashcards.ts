import { z } from 'zod';

const FlashcardSchema = z.object({
  type: z.enum(['multichoice', 'yesno', 'qa']),
  question: z.string().min(1),
  answer: z.array(z.string()).min(1),
  choices: z.array(z.string()).max(4).optional(),
});

export const flashcardsSchema = z.array(FlashcardSchema);
