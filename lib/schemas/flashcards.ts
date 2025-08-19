import { z } from 'zod';

const FlashcardSchema = z.object({
  type: z.enum(['multichoice', 'yesno', 'qa']),
  question: z.string().min(1),
  answer: z.array(z.string()).min(1),
  choices: z.array(z.string()).max(4).optional(),
});

export const flashcardsResponseSchema = z.object({
  title: z.string().min(3).max(55),
  cards: z.array(FlashcardSchema),
});

export type FlashcardResponse = z.input<typeof flashcardsResponseSchema>;
