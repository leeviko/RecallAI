import styles from './styles/LoaderInline.module.css';

const LoaderInline = () => {
  return (
    <div className={styles.container}>
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
