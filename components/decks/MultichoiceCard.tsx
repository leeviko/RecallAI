import { CardWithId } from '@/lib/schemas/flashcards';
import styles from './styles/MultichoiceCard.module.css';
import { useState } from 'react';

type Props = {
  card: CardWithId;
};

const MultichoiceCard = ({ card }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (selectedAnswer: string) => {
    if (selected) return;
    setSelected(selectedAnswer);
  };

  return (
    <div className={`${styles.multichoice}`}>
      <div className={styles.content}>
        <p className={styles.question}>{card.question}</p>
        <div className={styles.choicesContainer}>
          <p className={styles.prompt}>
            {!selected && <span>Choose an answer</span>}
            {selected === card.answer && (
              <span className={styles.correct}>Correct! Nice job.</span>
            )}
            {selected && selected !== card.answer && (
              <span className={styles.incorrect}>Wrong! Maybe next time.</span>
            )}
          </p>
          <div className={styles.choices}>
            {card.choices?.map((choice, i) => (
              <button
                key={choice}
                className={`${styles.choice} ${
                  choice === selected &&
                  (selected === card.answer ? styles.correct : styles.incorrect)
                } ${
                  selected && selected !== card.answer && choice === card.answer
                    ? styles.correct
                    : ''
                }
                `}
                onClick={() => handleClick(choice)}
                disabled={!!selected}
              >
                <span>{i + 1}</span>
                <p>{choice}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultichoiceCard;
