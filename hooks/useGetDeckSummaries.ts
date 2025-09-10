import { DeckSummary } from '@/lib/db/decks';
import { useEffect, useState } from 'react';

export function useGetDeckSummaries(initialDecks: DeckSummary[], limit = 8) {
  const [decks, setDecks] = useState(initialDecks);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (initialDecks.length === limit) {
      setHasMore(true);
    }
  }, [initialDecks]);

  const fetchPage = async (newPage: number) => {
    if (newPage < 1) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/decks?page=${newPage}`);
      const data: DeckSummary[] = await response.json();
      if (data.length > 0) {
        setDecks(data);
        setPage(newPage);
      }
      console.log(data.length, limit);
      setHasMore(data.length === limit);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    decks,
    loading,
    page,
    hasMore,
    fetchPage,
  };
}
