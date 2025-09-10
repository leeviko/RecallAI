'use client';
import { DeckSummary } from '@/lib/db/decks';
import DeckCard from '../decks/DeckCard';
import styles from './styles/DeckList.module.css';
import { use } from 'react';
import Image from 'next/image';
import { APIResponse } from '@/lib/api-client';
import { useGetDeckSummaries } from '@/hooks/useGetDeckSummaries';

type Props = {
  decksPromise: Promise<APIResponse<DeckSummary[]>>;
};

const DeckList = ({ decksPromise }: Props) => {
  const initialDecks = use(decksPromise);
  const { decks, loading, page, hasMore, fetchPage } = useGetDeckSummaries(
    initialDecks.ok ? initialDecks.data : []
  );

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
