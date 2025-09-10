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
import { Suspense } from 'react';
import Skeleton from '@/components/loader/Skeleton';

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const decks = getUserDeckSummaries(session.user.id);
  const counts = getUserDeckCounts(session.user.id);
  const studyTime = getTotalStudyTime(session.user.id);
  const lastStudied = getLastStudied(session.user.id);

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
      <Suspense fallback={<Skeleton height="130px" count={4} />}>
        <Stats
          countsPromise={counts}
          studyTimePromise={studyTime}
          lastStudiedPromise={lastStudied}
        />
      </Suspense>
      <div className={styles.decks}>
        <h2>Your Decks</h2>
        <Suspense fallback={<Skeleton height="150px" count={4} />}>
          <DeckList decksPromise={decks} />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
