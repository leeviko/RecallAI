import styles from '../Page.module.css';
const Page = () => {
  return (
    <div className={styles.page}>
      <h1>Privacy Policy</h1>
      <p className={styles.date}>Last updated: September 10, 2025</p>
      <p className={styles.text}>
        We only collect the information needed to run this flashcard website,
        such as your email, study data, and the prompts you enter. This data is
        used only to provide the service (like saving decks, tracking study
        sessions, and generating flashcards with AI).
      </p>
    </div>
  );
};

export default Page;
