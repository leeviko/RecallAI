'use client';
import Image from 'next/image';
import styles from './styles/DeckCard.module.css';
import Link from 'next/link';
import { prettyDate } from '@/lib/utils';
import Dropdown from '../ui/Dropdown';
import { deleteDeck } from '@/app/(decks)/actions';
import { toast } from 'sonner';

type Props = {
  id: string;
  name: string;
  numOfCards: number;
  lastVisited: Date | string;
};

const DeckCard = ({ id, name, numOfCards, lastVisited }: Props) => {
  const lastVisitedDate = new Date(lastVisited);
  const isValidDate = !isNaN(lastVisitedDate.getTime());

  const handleDelete = async () => {
    try {
      const result = await deleteDeck(id);
      if (result.ok) {
        toast.success('Deck deleted');
      } else {
        toast.error(result.msg || 'Failed to delete deck');
      }
    } catch (error) {
      toast.error('Failed to delete deck');
    }
  };

  const trimName = (name: string) => {
    const maxLength = 30;
    if (name.length > maxLength) {
      return name.slice(0, maxLength - 3) + '...';
    }
    return name;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{trimName(name)}</h3>
        <div className={styles.dropdown}>
          <Dropdown
            btnIconUrl="/icons/more.svg"
            items={[
              { label: 'Edit', link: `/deck/${id}/edit` },
              { label: 'Delete', onClick: handleDelete },
            ]}
            right="0"
          />
        </div>
      </div>
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
        </div>
      </div>
    </div>
  );
};

export default DeckCard;
