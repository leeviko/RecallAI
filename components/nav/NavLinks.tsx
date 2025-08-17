import styles from './NavLinks.module.css';

const NavLinks = () => {
  return (
    <div className={styles.links}>
      <div className={styles.link}>Login</div>
      <div className={styles.link}>Register</div>
    </div>
  );
};

export default NavLinks;
