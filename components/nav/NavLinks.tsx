'use client';
import styles from './styles/NavLinks.module.css';
import Link from 'next/link';
import Avatar from '../ui/Avatar';
import { usePathname } from 'next/navigation';
import { useSession } from '@/lib/auth-client';

const NavLinks = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  return (
    <div className={styles.container}>
      {session && (
        <div className={styles.links}>
          <Link
            className={`${styles.link} ${
              pathname === '/dashboard' ? styles.active : ''
            }`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`${styles.link} ${
              pathname === '/create' ? styles.active : ''
            }`}
            href="/create"
          >
            Generate
          </Link>
          <Avatar />
        </div>
      )}
      {!session && !isPending && (
        <div className={styles.links}>
          <Link
            className={`${styles.link} ${
              pathname === '/login' ? styles.active : ''
            }`}
            href="/login"
          >
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
