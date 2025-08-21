import styles from '@/styles/ProgressBar.module.css';
import React from 'react';

type Props = {
  progress: number;
  color: string;
};

const ProgressBar = ({ progress, color }: Props) => {
  return (
    <div className={styles.progressBar} style={{ width: `100%` }}>
      <div
        className={styles.progressFill}
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;
