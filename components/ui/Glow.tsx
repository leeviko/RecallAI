import styles from './styles/Glow.module.css';

type Props = {
  opacity?: number;
};

const Glow = ({ opacity }: Props) => {
  return <div className={styles.glow} style={{ opacity }}></div>;
};

export default Glow;
