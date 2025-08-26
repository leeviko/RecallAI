import Image from 'next/image';
import styles from './styles/DeckCard.module.css';
import Link from 'next/link';
import { prettyDate } from '@/lib/utils';

type Props = {
  id: string;
  name: string;
  numOfCards: number;
  lastVisited: Date | string;
};

const DeckCard = ({ id, name, numOfCards, lastVisited }: Props) => {
  const lastVisitedDate = new Date(lastVisited);
  const isValidDate = !isNaN(lastVisitedDate.getTime());

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      {/* <p className={styles.numOfCards}>
        <Tag>{numOfCards} Cards</Tag>
      </p> */}
      <div className={styles.info}>
        <span className={styles.lastStudied}>
          Last studied{' '}
          <strong>{isValidDate ? prettyDate(lastVisitedDate) : 'Never'}</strong>
        </span>
        <div className={styles.actions}>
          <Link href={`/deck/${id}`} className={styles.studyBtn}>
            <Image
              src="/icons/arrow-full.svg"
              alt="Study"
              width={16}
              height={16}
            />
            <span>Study</span>
          </Link>
          <Link href={`/deck/${id}/edit`} className={styles.editBtn}>
            <Image src="/icons/edit.svg" alt="Edit" width={16} height={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
