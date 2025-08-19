'use client';
import Image from 'next/image';
import styles from './styles/Chat.module.css';
import { generateDecks } from '@/data/generation';
import { useState } from 'react';
import { toast } from 'sonner';
import { FlashcardResponse } from '@/lib/schemas/flashcards';

type Props = {
  data: FlashcardResponse | null;
  setData: (data: FlashcardResponse) => void;
  setGenerated: (generated: boolean) => void;
};

const Chat = ({ data, setData, setGenerated }: Props) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    const response = await generateDecks(prompt);
    setLoading(false);
    if (response.ok && response.data) {
      toast.success('Flashcards generated successfully!');
      setData(response.data);
      setGenerated(true);
    } else {
      toast.error(response.msg);
      console.error(response.msg);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="Paste your notes here, enter a topic, or describe what you want to learn about..."
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          e.target.style.height = 'auto';
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />
      <div
        className={`${styles.sendContainer} ${loading ? styles.loading : ''}`}
      >
        <button onClick={handleGenerate} disabled={loading}>
          <p className={styles.btnText}>
            {loading && (
              <>
                {'Thinking...'.split('').map((char, i) => (
                  <span
                    key={i}
                    className={styles.wave}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    {char}
                  </span>
                ))}
              </>
            )}

            {!loading && <span className={styles.wave}>Generate</span>}
          </p>
          <Image src="/icons/send.svg" alt="Send" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
