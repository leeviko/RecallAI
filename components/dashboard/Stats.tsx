import StatCard from '../ui/StatCard';
import styles from './styles/Stats.module.css';

type Props = {
  totalDecks: number | string;
  totalCards: number | string;
  studyTime: number | string;
  lastStudied: number | string;
};

const Stats = ({ totalDecks, totalCards, studyTime, lastStudied }: Props) => {
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
