import { CardWithId } from '@/lib/schemas/flashcards';
import styles from './styles/Flashcard.module.css';
import TrueFalseCard from './TrueFalseCard';
import MultichoiceCard from './MultichoiceCard';
import QACard from './QACard';

type Props = {
  card: CardWithId;
};

const Flashcard = ({ card }: Props) => {
  return (
    <div className={styles.flashcard}>
      {card.type === 'QA' && <QACard card={card} />}
      {card.type === 'MULTICHOICE' && <MultichoiceCard card={card} />}
      {card.type === 'TRUEFALSE' && <TrueFalseCard card={card} />}
    </div>
  );
};

export default Flashcard;
