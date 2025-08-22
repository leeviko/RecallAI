import Image from 'next/image';
import styles from './styles/CardItem.module.css';
import { useState } from 'react';
import Button from '../buttons/Button';
import { FlashcardType } from '@prisma/client';
import { DeckResponse, FlashcardResponse } from '@/lib/schemas/flashcards';

type Props = {
  number: number;
  type: FlashcardType;
  question: string;
  answer: string;
  choices?: string[];

  setData: React.Dispatch<React.SetStateAction<DeckResponse | null>>;
};

const CardItem = ({
  number,
  question,
  type,
  answer,
  choices,
  setData,
}: Props) => {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  // const [newChoices, setNewChoices] = useState(choices)
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = () => {
    const updatedCard: FlashcardResponse = {
      type,
      question: newQuestion,
      answer: newAnswer,
      choices,
    };

    setData((prevData: DeckResponse | null) => {
      if (!prevData) return null;

      const updatedData: DeckResponse = {
        ...prevData,
        cards: prevData.cards.map((card, i) =>
          i === number - 1 ? { ...card, ...updatedCard } : card
        ),
      };
      return updatedData;
    });

    setIsOpen(false);
  };

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
      {type === FlashcardType.QA && (
        <div
          className={`${styles.content} ${
            isOpen ? styles.open : styles.closed
          }`}
        >
          <label htmlFor={`question-${number}`}>Question</label>
          <input
            type="text"
            id={`question-${number}`}
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className={styles.input}
          />
          <label htmlFor={`answer-${number}`}>Answer</label>
          <input
            type="text"
            id={`answer-${number}`}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className={styles.input}
          />
          <div className={styles.btnContainer}>
            <Button size="sm" onClick={handleUpdate}>
              Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardItem;
