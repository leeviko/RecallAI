import { DeckSummary } from '@/lib/db/decks';
import DeckCard from '../decks/DeckCard';
import styles from './styles/DeckList.module.css';

type Props = {
  decks: DeckSummary[];
};

const DeckList = ({ decks }: Props) => {
  return (
    <div className={styles.deckList}>
      {decks.map((deck) => (
        <DeckCard
          key={deck.id}
          name={deck.name}
          id={deck.id}
          numOfCards={-1}
          lastVisited={deck.lastVisited || 'Never'}
        />
      ))}
    </div>
  );
};

export default DeckList;
