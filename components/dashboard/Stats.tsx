import { GetUserDeckCountsResponse } from '@/lib/schemas/flashcards';
import StatCard from '../ui/StatCard';
import styles from './styles/Stats.module.css';
import { APIResponse } from '@/lib/api-client';
import { use } from 'react';

type Props = {
  countsPromise: Promise<APIResponse<GetUserDeckCountsResponse>>;
  studyTimePromise: Promise<string>;
  lastStudiedPromise: Promise<string>;
};

const Stats = ({
  countsPromise,
  studyTimePromise,
  lastStudiedPromise,
}: Props) => {
  const countsRes = use(countsPromise);
  const studyTime = use(studyTimePromise);
  const lastStudied = use(lastStudiedPromise);

  const totalDecks = countsRes.ok ? countsRes.data.totalDecks : 0;
  const totalCards = countsRes.ok ? countsRes.data.totalCards : 0;

  return (
    <div className={styles.stats}>
      <StatCard title="Total Decks" value={totalDecks} icon="/icons/book.svg" />
      <StatCard title="Total Cards" value={totalCards} icon="/icons/book.svg" />
      <StatCard title="Study Time" value={studyTime} icon="/icons/book.svg" />
      <StatCard
        title="Last studied"
        value={lastStudied}
        icon="/icons/book.svg"
      />
    </div>
  );
};

export default Stats;
