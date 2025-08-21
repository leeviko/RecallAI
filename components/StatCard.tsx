import styles from '@/styles/StatCard.module.css';
import Image from 'next/image';
import React from 'react';

type Props = {
  title: string;
  value: string | number;
  icon: string;
};

const StatCard = ({ title, value, icon }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <Image src={icon} alt={`${title} icon`} width={32} height={32} />
    </div>
  );
};

export default StatCard;
