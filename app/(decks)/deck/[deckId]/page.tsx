import Deck from '@/components/decks/Deck';
import styles from '@/components/decks/styles/DeckPage.module.css';
import { DeckWithCards } from '@/lib/schemas/flashcards';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { apiFetch } from '@/lib/api-client';
import { updateDeck } from '../../actions';

type Props = {
  params: Promise<{
    deckId: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { deckId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/login');
  }

  const res = await apiFetch<DeckWithCards>(`/api/decks/${deckId}`);

  if (!res.ok) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p>Error loading deck: {res.msg}</p>
        </div>
      </div>
    );
  }

  await updateDeck(deckId, { lastVisited: new Date() });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Deck deck={res.data} />
      </div>
    </div>
  );
};

export default page;
