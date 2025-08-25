'use client';
import { useRef, useState } from 'react';
import styles from './styles/Avatar.module.css';
import UserMenu from '@/components/ui/UserMenu';
import useClickOutside from '@/hooks/useClickOutside';
import Image from 'next/image';

const Avatar = () => {
  const [menuHidden, setMenuHidden] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuHidden(true));

  const handleAvatarClick = () => {
    setMenuHidden(!menuHidden);
  };

  return (
    <div ref={menuRef} className={styles.container}>
      <button className={styles.avatarBtn}>
        <Image
          className={styles.avatar}
          src="/icons/account.svg"
          alt="User Avatar"
          width={24}
          height={24}
          onClick={handleAvatarClick}
        />
      </button>
      <UserMenu hidden={menuHidden} setMenuHidden={setMenuHidden} />
    </div>
  );
};

export default Avatar;
