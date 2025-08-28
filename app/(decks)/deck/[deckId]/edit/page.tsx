import styles from './page.module.css';
import { auth } from '@/lib/auth';
import { getDeckDb } from '@/lib/db/decks';
import { notFound, redirect } from 'next/navigation';
import { headers } from 'next/headers';
import React from 'react';
import EditExistingDeck from '@/components/decks/EditExistingDeck';

type Props = {
  params: Promise<{
    deckId: string;
  }>;
};

const Page = async ({ params }: Props) => {
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

  const deck = response.data;

  return (
    <div className={styles.page}>
      <EditExistingDeck deck={deck} />
    </div>
  );
};

export default Page;
