'use client';
import Image from 'next/image';
import Button from '../buttons/Button';
import styles from './styles/EditDeck.module.css';
import { DeckWithIds, DeckWithoutIds } from '@/lib/schemas/flashcards';
import CardItem from './CardItem';
import Tag from '../ui/Tag';

type CommonProps = {
  handleBack: () => void;
  handleSubmit: () => void;
  loading: boolean;
};

type Props =
  | (CommonProps & {
      isNewDeck: false;
      deck: DeckWithIds;
      setDeck: React.Dispatch<React.SetStateAction<DeckWithIds>>;
    })
  | (CommonProps & {
      isNewDeck: true;
      deck: DeckWithoutIds;
      setDeck: React.Dispatch<
        React.SetStateAction<DeckWithoutIds | null | string>
      >;
    });

const EditDeck = ({
  isNewDeck,
  deck,
  setDeck,
  handleBack,
  handleSubmit,
  loading,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleBack} className={styles.backBtn}>
          <Image
            src="/icons/arrow-full.svg"
            alt="Go back"
            width={32}
            height={32}
          />
          <span>Back to {isNewDeck ? 'Generate' : 'Dashboard'}</span>
        </button>
        <div className={styles.titleContainer}>
          <h2>{deck.name}</h2>
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            <span>Start studying</span>
            <Image src="/icons/arrow.svg" alt="Arrow" width={16} height={16} />
          </Button>
        </div>
        <div className={styles.tagContainer}>
          <Tag>{deck.cards.length} cards</Tag>
          <span className={styles.aiGenerated}>✨ AI Generated</span>
        </div>
      </div>
      <div className={styles.list}>
        {deck.cards.map((card, i) => (
          <CardItem
            key={i}
            {...card}
            number={i + 1}
            id={'id' in card ? card.id : undefined}
            isNewDeck={isNewDeck}
            setDeck={
              setDeck as React.Dispatch<
                React.SetStateAction<DeckWithIds | DeckWithoutIds>
              >
            }
          />
        ))}
      </div>
    </div>
  );
};

export default EditDeck;
