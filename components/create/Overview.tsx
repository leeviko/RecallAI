import { DeckResponse } from '@/lib/schemas/flashcards';
import styles from './styles/Edit.module.css';
import Tag from '../ui/Tag';
import CardItem from '../decks/CardItem';
import Button from '../buttons/Button';
import Image from 'next/image';
import { addDeck } from '@/app/(decks)/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';

type Props = {
  response: DeckResponse;
  setResponse: React.Dispatch<
    React.SetStateAction<DeckResponse | null | string>
  >;
};

const Overview = ({ response, setResponse }: Props) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const res = await addDeck(response);
    setLoading(false);

    if (res.ok) {
      toast.success('Deck saved successfully!');
      redirect(`/deck/${res.data.id}`);
    } else {
      toast.error('Failed to save deck.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <h2>{response.title}</h2>
          <Button size="sm" onClick={handleSubmit} disabled={loading}>
            <span>Start studying</span>
            <Image src="/icons/arrow.svg" alt="Arrow" width={16} height={16} />
          </Button>
        </div>
        <div className={styles.tagContainer}>
          <Tag>{response.cards.length} cards</Tag>
          <span className={styles.aiGenerated}>✨ AI Generated</span>
        </div>
      </div>
      <div className={styles.list}>
        {response.cards.map((card, i) => (
          <CardItem key={i} {...card} number={i + 1} setDeck={setResponse} />
        ))}
      </div>
    </div>
  );
};

export default Overview;
