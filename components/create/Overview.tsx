import { DeckResponse } from '@/lib/schemas/flashcards';
import styles from './styles/Edit.module.css';
import Tag from '../Tag';
import CardItem from '../decks/CardItem';
import Button from '../buttons/Button';
import Image from 'next/image';
import { addDeck } from '@/data/decks';
import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type Props = {
  data: DeckResponse;
  setData: React.Dispatch<React.SetStateAction<DeckResponse | null>>;
};

const Overview = ({ data, setData }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await addDeck(data);
    setLoading(false);

    if (response.ok) {
      toast.success('Deck saved successfully!');
      redirect(`/deck/${response.data.id}`);
    } else {
      toast.error('Failed to save deck.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>{data.title}</h2>
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
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
          <CardItem key={i} {...card} number={i + 1} setData={setData} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
