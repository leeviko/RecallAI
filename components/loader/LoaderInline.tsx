import styles from './styles/LoaderInline.module.css';

type Props = {
  color?: 'white' | 'black';
};

const LoaderInline = ({ color = 'black' }: Props) => {
  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>_</span>
    </div>
  );
};

export default LoaderInline;
