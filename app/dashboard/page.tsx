import styles from '@/components/dashboard/styles/Dashboard.module.css';
import Button from '@/components/buttons/Button';
import Image from 'next/image';
import { getUserDeckCounts, getUserDeckSummaries } from '@/lib/db/decks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getTotalStudyTime, getLastStudied } from '@/lib/db/studySessions';
import Stats from '@/components/dashboard/Stats';
import DeckList from '@/components/dashboard/DeckList';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  let [decks, countsResult, studyTime, lastStudied] = await Promise.all([
    getUserDeckSummaries(session.user.id),
    getUserDeckCounts(session.user.id),
    getTotalStudyTime(session.user.id),
    getLastStudied(session.user.id),
  ]);

  let counts;
  if (!countsResult.ok) {
    counts = { totalDecks: '-', totalCards: '-' };
  } else {
    counts = countsResult.data;
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
      <Stats
        totalDecks={counts.totalDecks}
        totalCards={counts.totalCards}
        studyTime={studyTime}
        lastStudied={lastStudied}
      />
      <div className={styles.decks}>
        <h2>Your Decks</h2>
        {decks.ok && <DeckList decks={decks.data} />}
        {!decks.ok && <p>Failed to load decks</p>}
      </div>
    </div>
  );
};

export default Page;
