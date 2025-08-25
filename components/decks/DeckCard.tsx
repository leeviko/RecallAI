import Image from 'next/image';
import Button from '../buttons/Button';
import Tag from '../ui/Tag';
import styles from './styles/DeckCard.module.css';
import Link from 'next/link';

type Props = {
  id: string;
  name: string;
  createdAt: string;
  numOfCards: number;
};

const DeckCard = ({ id, name, createdAt, numOfCards }: Props) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      {/* <p className={styles.numOfCards}>
        <Tag>{numOfCards} Cards</Tag>
      </p> */}
      <div className={styles.info}>
        {/* <span className={styles.lastStudied}>
          Last studied <strong>Jan 20</strong>
        </span> */}
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
