import StatCard from '@/components/ui/StatCard';
import styles from './Dashboard.module.css';
import Button from '@/components/buttons/Button';
import DeckCard from '@/components/decks/DeckCard';
import Image from 'next/image';
import { getUserDecksDb } from '@/lib/db/decks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getTotalStudyTime, getLastStudied } from '@/lib/db/studySessions';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const [result, studyTime, lastStudied] = await Promise.all([
    getUserDecksDb(session.user.id),
    getTotalStudyTime(session.user.id),
    getLastStudied(session.user.id),
  ]);

  // TODO
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
          <Button color="blue" variant="fill" size="sm" href="/create">
            <Image src="/icons/add.svg" alt="Add Icon" width={20} height={20} />
            <span>Create new deck</span>
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
        <StatCard title="Study Time" value={studyTime} icon="/icons/book.svg" />
        <StatCard
          title="Last studied"
          value={lastStudied}
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
              lastVisited={deck.lastVisited || 'Never'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
