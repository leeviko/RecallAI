'use client';
import Image from 'next/image';
import styles from './styles/DeckCompleted.module.css';
import ProgressBar from '../ui/ProgressBar';
import Button from '../buttons/Button';
import { useEffect, useState } from 'react';
import { formatDuration } from '@/lib/utils';

type Props = {
  deckName: string;
  totalCards: number;
  startTime: number;
  endTime: number;
};

const DeckCompleted = ({ deckName, totalCards, startTime, endTime }: Props) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Animate the progress bar from 0 to 100
  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const duration = 900; // ms
    const from = 0;
    const to = 100;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(elapsed / duration, 1);

      // cubic ease out
      const eased = 1 - Math.pow(1 - t, 3);
      setAnimatedProgress(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.trophy}>
          <Image src="/icons/pokaali.svg" alt="Trophy" width={48} height={48} />
        </div>
        <h2>Deck Complete!</h2>
        <p>Great job studying "{deckName}"</p>
      </div>
      <div className={styles.successImgContainer}>
        <Image
          src="/assets/success.svg"
          alt="Completed"
          className={`${styles.successImg} ${mounted ? styles.show : ''}`}
          width={466}
          height={214}
        />
      </div>
      <div className={styles.progress}>
        <div className={styles.progressTextContainer}>
          <span className={styles.progressText}>Progress</span>
          <span className={styles.progressText}>{animatedProgress}%</span>
        </div>
        <ProgressBar progress={animatedProgress} color="var(--green-100)" />
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <p>{totalCards}</p>
          <span>Total Cards</span>
        </div>
        <div className={styles.stat}>
          <p>{formatDuration(endTime - startTime)}</p>
          <span>Study Time</span>
        </div>
      </div>
      <div className={styles.actions}>
        <Button href="/dashboard" variant="fill" size="sm" color="blue">
          Back to Dashboard
        </Button>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          size="sm"
          color="blue"
        >
          Study Again
        </Button>
      </div>
      <div className={styles.footer}>
        <h3>What's next?</h3>
        <ul>
          <li>Try spaced repetition by studying again tomorrow</li>
          <li>Create new decks to expand your knowledge</li>
        </ul>
      </div>
    </div>
  );
};

export default DeckCompleted;
