'use client';
import Image from 'next/image';
import styles from './styles/Chat.module.css';
import { generateDeck } from '@/app/(decks)/actions';
import { useState } from 'react';
import { toast } from 'sonner';
import { DeckWithoutIds } from '@/lib/schemas/flashcards';

type Props = {
  response: DeckWithoutIds | null | string;
  setResponse: (data: DeckWithoutIds | string) => void;
  setGenerated: (generated: boolean) => void;

  setLoading: (loading: boolean) => void;
  loading: boolean;
};

const Chat = ({
  response,
  setResponse,
  setGenerated,
  setLoading,
  loading,
}: Props) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      return;
    }

    setLoading(true);
    const res = await generateDeck(prompt);
    setLoading(false);

    if (res.ok && res.data) {
      toast.success('Flashcards generated successfully!');
      setResponse(res.data);
      setPrompt('');
      setGenerated(true);
    } else if (!res.ok) {
      if (res.status === 400) {
        setPrompt('');
        setResponse(res.msg);
      } else {
        setResponse('Failed to generate valid cards!');
      }
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
