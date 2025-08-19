import { FlashcardResponse } from '@/lib/schemas/flashcards';
import styles from './styles/Edit.module.css';
import Tag from '../Tag';
import CardItem from '../decks/CardItem';
import Button from '../buttons/Button';
import Image from 'next/image';

type Props = {
  data: FlashcardResponse;
};

const Edit = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>{data.title}</h2>
          <Button size="sm">
            <span>Start studying</span>
            <Image src="/icons/arrow.svg" alt="Arrow" width={16} height={16} />
          </Button>
        </div>
        <div className={styles.tagContainer}>
          <Tag>{data.cards.length} cards</Tag>
          <span className={styles.aiGenerated}>✨ AI Generated</span>
        </div>
      </div>
      <div className={styles.list}>
        {data.cards.map((card, i) => (
          <CardItem key={i} {...card} number={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default Edit;
