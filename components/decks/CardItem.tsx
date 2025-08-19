import Image from 'next/image';
import styles from './styles/CardItem.module.css';
import { useState } from 'react';
import InputField from '../forms/InputField';
import Button from '../buttons/Button';

type Props = {
  number: number;
  type: 'multichoice' | 'yesno' | 'qa';
  question: string;
  answer: string[];
  choices?: string[];
};

const CardItem = ({ number, question, type, answer, choices }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <h3 className={styles.title}>{question}</h3>
        <button
          className={`${styles.toggle} ${isOpen ? styles.open : styles.closed}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Image src="/icons/arrow.svg" alt="Toggle" width={24} height={24} />
        </button>
      </div>
      {type === 'qa' && (
        <div
          className={`${styles.content} ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          <label htmlFor={`question-${number}`}>Question</label>
          <input
            type="text"
            id={`question-${number}`}
            value={question}
            className={styles.input}
          />
          <label htmlFor={`answer-${number}`}>Answer</label>
          <input
            type="text"
            id={`answer-${number}`}
            className={styles.input}
            value={answer[0]}
          />
          <div className={styles.btnContainer}>
            <Button size="sm">Save</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
