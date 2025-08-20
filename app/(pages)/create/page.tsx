'use client';
import CreateForm from '@/components/create/CreateForm';
import Overview from '@/components/create/Overview';
import { DeckResponse } from '@/lib/schemas/flashcards';
import styles from '@/styles/CreatePage.module.css';
import { useState } from 'react';

const Page = () => {
  const [generated, setGenerated] = useState(false);
  const [data, setData] = useState<DeckResponse | null>(null);

  return (
    <div className={styles.page}>
      {!generated && (
        <CreateForm data={data} setData={setData} setGenerated={setGenerated} />
      )}
      {generated && data && <Overview data={data} />}
    </div>
  );
};

export default Page;
