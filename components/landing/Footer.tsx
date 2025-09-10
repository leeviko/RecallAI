import Link from 'next/link';
import styles from './styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <h3>RecallAI</h3>
        <div className={styles.links}>
          <Link href="/tos">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
