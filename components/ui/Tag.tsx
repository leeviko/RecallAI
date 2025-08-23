import styles from './styles/Tag.module.css';
type Props = {
  children: React.ReactNode;
  hex?: string;
};
const Tag = ({ children, hex }: Props) => {
  return (
    <span
      className={styles.tag}
      style={{
        backgroundColor: hex ? hex : 'var(--purple-dark-050)',
      }}
    >
      {children}
    </span>
  );
};

export default Tag;
