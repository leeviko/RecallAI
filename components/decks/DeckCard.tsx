import Button from '../buttons/Button';
import Tag from '../Tag';
import styles from './styles/DeckCard.module.css';

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
      <p className={styles.numOfCards}>
        <Tag>{numOfCards} Cards</Tag>
      </p>
      <div className={styles.actions}>
        <Button variant="fill" color="blue" size="sm" href={`/deck/${id}`}>
          Study
        </Button>
        <Button variant="outline" color="blue" size="sm" href={`/deck/${id}`}>
          Edit
        </Button>
      </div>
      <div className={styles.dates}>
        <span>Created Jan 20</span>
        <span>Studied Jan 20</span>
      </div>
    </div>
  );
};

export default DeckCard;
