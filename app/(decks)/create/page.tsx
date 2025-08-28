'use client';
import CreateForm from '@/components/create/CreateForm';
import Overview from '@/components/create/Overview';
import { DeckWithoutIds } from '@/lib/schemas/flashcards';
import styles from '@/components/create/styles/CreatePage.module.css';
import { useState } from 'react';

const Page = () => {
  const [generated, setGenerated] = useState(false);
  const [response, setResponse] = useState<DeckWithoutIds | null | string>(
    null
  );
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.page}>
      {!generated && (
        <CreateForm
          response={response}
          setResponse={setResponse}
          setGenerated={setGenerated}
          setLoading={setLoading}
          loading={loading}
        />
      )}
      {generated && typeof response !== 'string' && response !== null && (
        <Overview
          deck={response}
          setDeck={setResponse}
          setGenerated={setGenerated}
        />
      )}
    </div>
  );
};

export default Page;
