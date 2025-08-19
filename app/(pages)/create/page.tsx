'use client';
import CreateForm from '@/components/create/CreateForm';
import Edit from '@/components/create/Edit';
import { FlashcardResponse } from '@/lib/schemas/flashcards';
import styles from '@/styles/CreatePage.module.css';
import { useState } from 'react';

const Page = () => {
  const [generated, setGenerated] = useState(false);
  const [data, setData] = useState<FlashcardResponse | null>(null);

  return (
    <div className={styles.page}>
      {!generated && (
        <CreateForm data={data} setData={setData} setGenerated={setGenerated} />
      )}
      {generated && data && <Edit data={data} />}
    </div>
  );
};

export default Page;
