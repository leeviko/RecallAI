'use client';
import { DeckSummary } from '@/lib/db/decks';
import DeckCard from '../decks/DeckCard';
import styles from './styles/DeckList.module.css';
import { useState } from 'react';
import Image from 'next/image';

type Props = {
  decks: DeckSummary[];
};

const DeckList = ({ decks: initialDecks }: Props) => {
  const [decks, setDecks] = useState(initialDecks);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialDecks.length === 8);

  const fetchPage = async (newPage: number) => {
    const limit = 8;
    if (newPage < 1) return;

    setLoading(true);

    const response = await fetch(`/api/decks?page=${newPage}`);
    const data = await response.json();

    if (data.length > 0) {
      setDecks(data);
      setPage(newPage);
    }
    if (data.length === limit) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.deckList}>
        {decks.map((deck) => (
          <DeckCard
            key={deck.id}
            name={deck.name}
            id={deck.id}
            numOfCards={-1}
            lastVisited={deck.lastVisited || 'Never'}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => fetchPage(page - 1)}
          disabled={loading || page === 1}
          className={styles.prevBtn}
        >
          <Image
            src="/icons/arrow-full.svg"
            alt="Previous"
            width={48}
            height={48}
          />
        </button>
        <button
          onClick={() => fetchPage(page + 1)}
          disabled={loading || !hasMore}
          className={styles.nextBtn}
        >
          <Image
            src="/icons/arrow-full.svg"
            alt="Next"
            width={48}
            height={48}
          />
        </button>
      </div>
    </div>
  );
};

export default DeckList;
