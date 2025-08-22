import StatCard from '@/components/StatCard';
import styles from './Dashboard.module.css';
import Button from '@/components/buttons/Button';
import DeckCard from '@/components/decks/DeckCard';
import { apiFetch } from '@/lib/api-client';
import { DeckWithCards } from '@/lib/schemas/flashcards';

const Page = async () => {
  const result = await apiFetch<DeckWithCards[]>('/api/decks');

  if (!result.ok) {
    return <div>No decks found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>Dashboard</h2>
          <p>View and manage your decks</p>
        </div>
        <div>
          <Button color="accent-dark" variant="fill" size="sm" href="/create">
            Create new deck
          </Button>
        </div>
      </div>
      <div className={styles.stats}>
        <StatCard
          title="Total Decks"
          value={result.data.length}
          icon="/icons/book.svg"
        />
        <StatCard
          title="Total Cards"
          value={result.data.reduce((acc, deck) => acc + deck.cards.length, 0)}
          icon="/icons/book.svg"
        />
        <StatCard
          title="Study Time"
          value={'21h 34mins'}
          icon="/icons/book.svg"
        />
        <StatCard
          title="Last studied"
          value={'Jan 20 2025'}
          icon="/icons/book.svg"
        />
      </div>
      <div className={styles.decks}>
        <h2>Your Decks</h2>
        <div className={styles.deckList}>
          {result.data.map((deck) => (
            <DeckCard
              key={deck.id}
              name={deck.name}
              id={deck.id}
              numOfCards={deck.cards.length}
              createdAt="Jan 20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
