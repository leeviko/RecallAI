'use client';
import { useState } from 'react';
import styles from './styles/QACard.module.css';
import { CardWithId } from '@/lib/schemas/flashcards';

type Props = {
  card: CardWithId;
};

const QACard = ({ card }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={`${styles.qa} ${isFlipped ? styles.flipped : ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={styles.content}>
        <div className={styles.frontCard}>
          <p className={styles.question}>{card.question}</p>
          <p className={styles.prompt}>Click to reveal answer</p>
        </div>
        <div className={styles.backCard}>
          <p className={styles.answer}>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default QACard;
