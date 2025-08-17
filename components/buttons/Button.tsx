import Link from 'next/link';
import styles from './styles/Button.module.css';

type Props = {
  variant?: 'text' | 'fill' | 'outline';
  color?: 'accent-light' | 'accent-dark' | 'danger' | 'white';
  size?: 'sm' | 'md' | 'lg';
  width?: 'default' | 'w-full';
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const Button = ({
  variant = 'fill',
  color = 'accent-dark',
  size = 'md',
  width = 'default',
  disabled = false,
  href,
  onClick,
  children,
}: Props) => {
  if (href) {
    const localLink = href.startsWith('/');
    if (localLink) {
      return (
        <Link
          href={href}
          className={`${styles.btn} ${styles[variant]} ${styles[color]} ${styles[size]} ${styles[width]}`}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={`${styles.btn} ${styles[variant]} ${styles[color]} ${styles[size]} ${styles[width]}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${styles[color]} ${styles[size]} ${styles[width]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
