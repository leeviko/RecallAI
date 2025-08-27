'use client';
import { useRef, useState } from 'react';
import styles from './styles/Dropdown.module.css';
import Image from 'next/image';
import Link from 'next/link';
import useClickOutside from '@/hooks/useClickOutside';

type Props = {
  btnIconUrl: string;
  btnSize?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'avatar';
  right?: string;
  items: { label: string; link?: string; onClick?: () => void }[];
};

const Dropdown = ({
  btnIconUrl,
  btnSize = 'md',
  items,
  variant = 'default',
  right = '10px',
}: Props) => {
  const [hidden, setHidden] = useState(true);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setHidden(true));

  return (
    <div ref={dropdownRef} className={styles.dropdownContainer}>
      <button className={`${styles.btn} ${styles[btnSize]} ${styles[variant]}`}>
        <Image
          className={styles.btnImg}
          src={btnIconUrl}
          alt="Dropdown button"
          width={24}
          height={24}
          onClick={() => setHidden(!hidden)}
        />
      </button>

      <div
        className={`${styles.menuContainer} ${
          hidden ? styles.hidden : styles.visible
        }`}
        style={{
          right,
        }}
      >
        <div className={styles.menu}>
          {items.map((item, index) => (
            <div key={index} className={styles.section}>
              {item.link ? (
                <Link href={item.link} onClick={item.onClick}>
                  {item.label}
                </Link>
              ) : (
                <button onClick={item.onClick}>{item.label}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
