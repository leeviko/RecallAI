import { FlashcardType } from '@prisma/client';
import { z } from 'zod';

export type GetUserDeckCountsResponse = {
  totalDecks: number;
  totalCards: number;
};

export type CardWithId = FlashcardResponse & { id: string };

export type DeckWithCards = {
  id: string;
  userId: string;
  name: string;
  cards: CardWithId[];
};

export type DeckWithIds = DeckWithCards;

export type DeckWithoutIds = {
  name: string;
  cards: FlashcardResponse[];
};

export type DeckWithCardsAndMetrics = DeckWithCards & {
  lastVisited: Date | undefined;
};

const flashcardSchema = z.object({
  type: z.enum(FlashcardType),
  question: z.string().min(1),
  answer: z.string(),
  choices: z.array(z.string()).max(4).optional(),
});

export const flashCardWithIdSchema = flashcardSchema.extend({
  id: z.string(),
});

export const deckResponseSchema = z.object({
  name: z.string().min(3).max(55),
  cards: z.array(flashcardSchema),
});

export type FlashcardResponse = z.input<typeof flashcardSchema>;

export type GeneratedDeckWithCards = {
  id: string;
  name: string;
  cards: FlashcardResponse[];
};

export const mockDeck: DeckWithoutIds = {
  name: 'React Basics Flashcards',
  cards: [
    {
      type: 'MULTICHOICE',
      question: 'Which company created React?',
      choices: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
      answer: 'Facebook',
    },
    {
      type: 'TRUEFALSE',
      question: 'Is React a JavaScript library for building user interfaces?',
      answer: 'True',
    },
    {
      type: 'QA',
      question: 'What hook is commonly used to manage state in React?',
      answer: 'useState',
    },
    {
      type: 'MULTICHOICE',
      question:
        'What is the name of the tree-like structure React uses to update the UI efficiently?',
      choices: ['Virtual DOM', 'Real DOM', 'Shadow DOM', 'JSON Tree'],
      answer: 'Virtual DOM',
    },
    {
      type: 'QA',
      question:
        'What command is used to create a new React app with Create React App?',
      answer: 'npx create-react-app app-name',
    },
  ],
};

export const qaMockDeck: DeckWithoutIds = {
  name: 'React Basics Flashcards',
  cards: [
    {
      type: 'QA',
      question: 'What is React mainly used for?',
      answer: 'Building user interfaces',
    },
    {
      type: 'QA',
      question:
        "What is the name of React's syntax extension for writing UI elements?",
      answer: 'JSX',
    },
    {
      type: 'QA',
      question:
        'What hook is commonly used to manage state in functional components?',
      answer: 'useState',
    },
    {
      type: 'QA',
      question: 'What is the purpose of React components?',
      answer: 'To reuse and organize UI code',
    },
    {
      type: 'QA',
      question:
        'What virtual concept does React use to update the UI efficiently?',
      answer: 'Virtual DOM',
    },
  ],
};
