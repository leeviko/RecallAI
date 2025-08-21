import Button from '../buttons/Button';
import ProgressBar from '../ProgressBar';
import styles from './styles/DeckCard.module.css';

type Props = {
  id: string;
  name: string;
  createdAt: string;
  progress?: number;
  numOfCards: number;
};

const DeckCard = ({ id, name, createdAt, numOfCards, progress }: Props) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.details}>
        <p className={styles.numOfCards}>{numOfCards} Cards</p>
        <ProgressBar
          progress={progress ? progress : 0}
          color="var(--blue-2-100)"
        />
        <div className={styles.dates}>
          <span>Created Jan 20</span>
          <span>Studied Jan 20</span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant="fill" color="blue" size="sm" href={`/deck/${id}`}>
          Study
        </Button>
        <Button variant="outline" color="blue" size="sm" href={`/deck/${id}`}>
          Edit
        </Button>
      </div>
    </div>
  );
};

export default DeckCard;
