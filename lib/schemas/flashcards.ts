import { FlashcardType } from '@prisma/client';
import { z } from 'zod';

const flashcardSchema = z.object({
  type: z.enum(FlashcardType),
  question: z.string().min(1),
  answer: z.array(z.string()).min(1),
  choices: z.array(z.string()).max(4).optional(),
});

export const deckResponseSchema = z.object({
  title: z.string().min(3).max(55),
  cards: z.array(flashcardSchema),
});

export type FlashcardResponse = z.input<typeof flashcardSchema>;
export type DeckResponse = z.input<typeof deckResponseSchema>;

export type DeckWithCards = {
  id: string;
  name: string;
  cards: FlashcardResponse[];
};
