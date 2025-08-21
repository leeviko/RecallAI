'use client';
import { DeckWithCards } from '@/lib/schemas/flashcards';
import Flashcard from './Flashcard';
import styles from './styles/Deck.module.css';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  deck: DeckWithCards;
};

const Deck = ({ deck }: Props) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const totalCards = deck.cards.length;
  const percentage = ((currentCardIndex + 1) / totalCards) * 100;

  const handlePrevClick = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentCardIndex < deck.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {deck.cards.map((card, index) => {
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
          className={`${styles.navBtn} ${styles.nextBtn} ${
            currentCardIndex === totalCards - 1 ? styles.disabled : ''
          }`}
          onClick={handleNextClick}
          disabled={currentCardIndex === totalCards - 1}
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
          <div className={styles.progressBar} style={{ width: `100%` }}>
            <div
              className={styles.progressFill}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deck;
