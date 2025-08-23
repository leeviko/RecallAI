import ChatPreview from '../create/ChatPreview';
import Glow from '../ui/Glow';
import styles from './styles/HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <Glow />
      <div className={styles.content}>
        <h1>
          <div>Paste. Learn. Remember.</div>
          <div>Your AI-powered study companion</div>
        </h1>
        <p>
          Turn any textbook, lecture notes, or article into smart flashcards you
          can actually remember.
        </p>
        <ChatPreview />
      </div>
    </section>
  );
};

export default HeroSection;
