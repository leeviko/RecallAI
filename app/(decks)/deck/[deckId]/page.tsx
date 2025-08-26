import Deck from '@/components/decks/Deck';
import styles from '@/components/decks/styles/DeckPage.module.css';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getDeckDb, updateDeckDb } from '@/lib/db/decks';

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

  const response = await getDeckDb(session.user.id, deckId);

  if (!response.ok) {
    if (response.status === 404) {
      return notFound();
    }

    return <div>Error loading deck</div>;
  }

  updateDeckDb(session.user.id, deckId, { lastVisited: new Date() }).catch(
    console.error
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Deck deck={response.data} />
      </div>
    </div>
  );
};

export default page;
