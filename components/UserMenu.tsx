'use client';
import { signOut } from '@/lib/auth-client';
import styles from '@/styles/UserMenu.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Props = {
  hidden: boolean;
  setMenuHidden: (hidden: boolean) => void;
};

const UserMenu = ({ hidden, setMenuHidden }: Props) => {
  const router = useRouter();
  const handleLogout = async () => {
    setMenuHidden(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully');
          router.push('/login');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'An error occurred');
        },
      },
    });
  };

  const handleClick = () => {
    setMenuHidden(true);
  };

  return (
    <div
      className={`${styles.container} ${
        hidden ? styles.hidden : styles.visible
      }`}
    >
      <div className={styles.menu}>
        <div className={styles.section}>
          <Link href="/dashboard" onClick={handleClick}>
            Dashboard
          </Link>
          <Link href="/generate" onClick={handleClick}>
            Generate decks
          </Link>
          <Link href="/settings" onClick={handleClick}>
            Settings
          </Link>
        </div>
        <div className={styles.section}>
          <button onClick={handleLogout}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
