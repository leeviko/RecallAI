import Glow from '@/components/Glow';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <Glow />
        <div className={styles.content}>
          <h1>
            <div>Paste. Learn. Remember.</div>
            <div>Your AI-powered study companion</div>
          </h1>
          {/* <p>
            Turn any textbook, lecture, or article into smart flashcards you can
            actually remember.
          </p> */}
        </div>
      </div>
    </div>
  );
}
