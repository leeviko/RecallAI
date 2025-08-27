import { CardWithId } from '@/lib/schemas/flashcards';
import styles from './styles/TrueFalseCard.module.css';
import { useState } from 'react';

type Props = {
  card: CardWithId;
};

const TrueFalseCard = ({ card }: Props) => {
  const [selected, setSelected] = useState<'True' | 'False' | null>(null);

  const handleClick = (selectedAnswer: 'True' | 'False') => {
    if (selected !== null) return;
    setSelected(selectedAnswer);
  };

  return (
    <div className={`${styles.multichoice}`}>
      <div className={styles.content}>
        <p className={styles.question}>{card.question}</p>
        <div className={styles.choicesContainer}>
          <p className={styles.prompt}>
            {selected === null && <span>Choose an answer</span>}
            {selected === card.answer && (
              <span className={styles.correct}>Correct! Nice job.</span>
            )}
            {selected !== null && selected !== card.answer && (
              <span className={styles.incorrect}>Wrong! Maybe next time.</span>
            )}
          </p>
          <div className={styles.choices}>
            <button
              className={`${styles.choice} ${
                selected === 'True'
                  ? card.answer === 'True'
                    ? styles.correct
                    : styles.incorrect
                  : ''
              }`}
              onClick={() => handleClick('True')}
              disabled={selected !== null}
            >
              <span>1</span>
              <p>True</p>
            </button>
            <button
              className={`${styles.choice} ${
                selected === 'False'
                  ? card.answer === 'False'
                    ? styles.correct
                    : styles.incorrect
                  : ''
              }`}
              onClick={() => handleClick('False')}
              disabled={selected !== null}
            >
              <span>2</span>
              <p>False</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseCard;
