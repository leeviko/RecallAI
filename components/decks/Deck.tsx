'use client';
import { DeckWithCards } from '@/lib/schemas/flashcards';
import styles from './styles/Deck.module.css';
import { useRef, useState } from 'react';
import DeckInProgress from './DeckInProgress';
import DeckCompleted from './DeckCompleted';
import { saveStudySession } from '@/app/(decks)/actions';
import { toast } from 'sonner';

type Props = {
  deck: DeckWithCards;
};

const Deck = ({ deck }: Props) => {
  const [completed, setCompleted] = useState(false);
  const startTime = useRef(Date.now());
  const endTime = useRef(Date.now());

  const handleComplete = async () => {
    setCompleted(true);

    endTime.current = Date.now();

    saveStudySession(deck.id, endTime.current - startTime.current).catch(() => {
      toast.error('Failed to save study session');
    });
  };

  return (
    <div className={styles.container}>
      {!completed && (
        <DeckInProgress cards={deck.cards} handleComplete={handleComplete} />
      )}
      {completed && (
        <DeckCompleted
          deckName={deck.name}
          totalCards={deck.cards.length}
          startTime={startTime.current}
          endTime={endTime.current}
        />
      )}
    </div>
  );
};

export default Deck;
