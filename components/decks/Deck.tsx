'use client';
import { DeckWithCards } from '@/lib/schemas/flashcards';
import styles from './styles/Deck.module.css';
import { useEffect, useRef, useState } from 'react';
import DeckInProgress from './DeckInProgress';
import DeckCompleted from './DeckCompleted';

type Props = {
  deck: DeckWithCards;
};

const Deck = ({ deck }: Props) => {
  const [completed, setCompleted] = useState(false);
  const startTime = useRef(Date.now());

  return (
    <div className={styles.container}>
      {!completed && (
        <DeckInProgress cards={deck.cards} setCompleted={setCompleted} />
      )}
      {completed && (
        <DeckCompleted
          deckName={deck.name}
          totalCards={deck.cards.length}
          startTime={startTime.current}
        />
      )}
    </div>
  );
};

export default Deck;
