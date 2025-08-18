import Chat from '@/components/generate/Chat';
import styles from '@/styles/Generate.module.css';

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Generate Flashcards with AI</h2>
        <p className={styles.subtitle}>
          Use the power of AI to create personalized flashcards effortlessly.
        </p>
        <Chat />
        <div className={styles.footer}>
          <h3>Help</h3>
          <p>
            💡You can generate <strong>multichoice</strong>,{' '}
            <strong>yes/no</strong>, or <strong>normal question/answer</strong>{' '}
            flashcards. If you don't specify, it will mix them.
          </p>
          <p>
            💡Example prompts:
            <br />- "Most common React developer interview questions. Use only
            qa cards." <br />- "Explain the basics of machine learning. Create
            15 flashcards."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
