import styles from './Navbar.module.css';
import NavLinks from './NavLinks';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <h3>RecallAI</h3>
        </div>
        <NavLinks />
      </div>
    </nav>
  );
};

export default Navbar;
