import styles from '../Page.module.css';

const Page = () => {
  return (
    <div className={styles.page}>
      <h1>Terms of Service</h1>
      <p className={styles.date}>Last updated: September 10, 2025</p>
      <p className={styles.text}>
        By using this website, you agree to: Use it for personal learning only.
        Accept that AI-generated flashcards may be inaccurate or wrong. Take
        responsibility for the content you create and how you use it. This site
        is offered “as is.” I make no guarantees and I'm not responsible if
        something goes wrong. You can stop using the site anytime.
      </p>
    </div>
  );
};

export default Page;
