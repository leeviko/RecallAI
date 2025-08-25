'use client';
import { CardWithId } from '@/lib/schemas/flashcards';
import styles from './styles/DeckInProgress.module.css';
import Flashcard from './Flashcard';
import Image from 'next/image';
import ProgressBar from '../ui/ProgressBar';
import { useState } from 'react';

type Props = {
  cards: CardWithId[];
  setCompleted: (completed: boolean) => void;
};

const DeckInProgress = ({ cards, setCompleted }: Props) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const totalCards = cards.length;
  const percentage = ((currentCardIndex + 1) / totalCards) * 100;

  const handlePrevClick = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentCardIndex < totalCards - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cards.map((card, index) => {
          let cardClass = styles.cardContainer;
          if (currentCardIndex === index) cardClass += ` ${styles.active}`;
          else if (currentCardIndex - 1 === index)
            cardClass += ` ${styles.prev}`;
          return (
            <div key={index} className={cardClass}>
              <Flashcard card={card} />
            </div>
          );
        })}
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.navBtn} ${styles.prevBtn} ${
            currentCardIndex === 0 ? styles.disabled : ''
          }`}
          onClick={handlePrevClick}
          disabled={currentCardIndex === 0}
        >
          <Image
            src="/icons/arrow-full.svg"
            alt="Previous"
            width={52}
            height={52}
          />
        </button>
        <button
          className={`${styles.navBtn} ${styles.nextBtn}`}
          onClick={handleNextClick}
        >
          <Image
            src="/icons/arrow-full.svg"
            alt="Next"
            width={52}
            height={52}
          />
        </button>
      </div>
      <div className={styles.stats}>
        <div className={styles.progress}>
          <span className={styles.progressText}>
            Card {currentCardIndex + 1} of {totalCards}
          </span>
          <ProgressBar progress={percentage} color="var(--accent)" />
        </div>
      </div>
    </div>
  );
};

export default DeckInProgress;
