'use client';
import { useSession } from '@/lib/auth-client';
import styles from './styles/NavLinks.module.css';
import Link from 'next/link';
import Avatar from '../Avatar';

const NavLinks = () => {
  const { data: session, isPending } = useSession();
  return (
    <div className={styles.container}>
      {session && <Avatar />}
      {!session && (
        <div className={styles.links}>
          <Link className={styles.link} href="/login">
            Login
          </Link>
          <Link
            className={`${styles.link} ${styles.register}`}
            href="/register"
          >
            <span>Register</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavLinks;
