'use client';
import CreateForm from '@/components/create/CreateForm';
import Overview from '@/components/create/Overview';
import { DeckResponse } from '@/lib/schemas/flashcards';
import styles from '@/components/create/styles/CreatePage.module.css';
import { useState } from 'react';

const Page = () => {
  const [generated, setGenerated] = useState(false);
  const [response, setResponse] = useState<DeckResponse | null | string>(null);
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
        <Overview response={response} setResponse={setResponse} />
      )}
    </div>
  );
};

export default Page;
