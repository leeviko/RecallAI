import styles from './styles/Skeleton.module.css';

type Props = {
  height: string;
  count?: number;
};

const Skeleton = ({ height, count }: Props) => {
  return (
    <div className={styles.skeleton} style={{ height }}>
      {Array.from({ length: count || 1 }, (_, i) => (
        <div key={i} className={styles.box}></div>
      ))}
    </div>
  );
};

export default Skeleton;
