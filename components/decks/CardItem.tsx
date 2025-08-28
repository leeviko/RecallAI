import Image from 'next/image';
import styles from './styles/CardItem.module.css';
import { useState } from 'react';
import Button from '../buttons/Button';
import { FlashcardType } from '@prisma/client';
import {
  DeckWithIds,
  DeckWithoutIds,
  FlashcardResponse,
} from '@/lib/schemas/flashcards';

type Props = {
  number: number;
  type: FlashcardType;
  question: string;
  answer: string;
  choices?: string[];

  isNewDeck: boolean;
  id?: string;
  setDeck: React.Dispatch<React.SetStateAction<DeckWithIds | DeckWithoutIds>>;
};

const CardItem = ({
  number,
  question,
  type,
  answer,
  choices,
  isNewDeck,
  id,
  setDeck,
}: Props) => {
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  const [newChoices, setNewChoices] = useState(choices);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = () => {
    const updatedCard: FlashcardResponse = {
      type,
      question: newQuestion,
      answer: newAnswer,
      choices: newChoices,
    };

    if (
      type === FlashcardType.MULTICHOICE &&
      !newChoices?.includes(newAnswer)
    ) {
      return;
    }

    setIsOpen(false);

    if (isNewDeck) {
      setDeck((prev) => {
        const prevData = prev as DeckWithoutIds;
        return {
          ...prevData,
          cards: prevData.cards.map((card, i) =>
            i === number - 1 ? { ...card, ...updatedCard } : card
          ),
        };
      });
      return;
    }

    setDeck((prev) => {
      const prevData = prev as DeckWithIds;
      return {
        ...prevData,
        cards: prevData.cards.map((card, i) =>
          card.id === id ? { ...card, ...updatedCard } : card
        ),
      };
    });
  };

  return (
    <div className={`${styles.card} ${styles[type]}`}>
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

      {type === FlashcardType.MULTICHOICE && newChoices && (
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
          <label>Choices</label>
          <div className={styles.choicesContainer}>
            {newChoices.map((choice, index) => (
              <div key={index} className={styles.choice}>
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => {
                    const choices = [...newChoices];
                    choices[index] = e.target.value;
                    setNewChoices(choices);
                  }}
                  className={styles.input}
                />
                <input
                  type="checkbox"
                  checked={choice === newAnswer}
                  onChange={() => setNewAnswer(choice)}
                />
              </div>
            ))}
          </div>
          <div className={styles.btnContainer}>
            <Button size="sm" onClick={handleUpdate}>
              Save
            </Button>
          </div>
        </div>
      )}

      {type === FlashcardType.TRUEFALSE && (
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
          <label>Choices</label>
          <div className={styles.choicesContainer}>
            <div className={styles.choice}>
              <p className={styles.input}>True</p>
              <input
                type="checkbox"
                checked={newAnswer === 'True'}
                onChange={() => setNewAnswer('True')}
              />
            </div>
            <div className={styles.choice}>
              <p className={styles.input}>False</p>
              <input
                type="checkbox"
                checked={newAnswer === 'False'}
                onChange={() => setNewAnswer('False')}
              />
            </div>
          </div>
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
