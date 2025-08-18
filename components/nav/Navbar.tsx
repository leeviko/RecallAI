import Link from 'next/link';
import styles from './styles/Navbar.module.css';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <Link className={styles.logo} href="/">
          <h3>RecallAI</h3>
        </Link>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
