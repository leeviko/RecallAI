import styles from './styles/InputField.module.css';
import Image from 'next/image';

type Props = {
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

const InputField = ({ value, handleChange, placeholder, error }: Props) => {
  return (
    <div className={styles.field}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder={placeholder}
          className={error ? styles.error : ''}
          value={value}
          onChange={handleChange}
        />
        {error && (
          <Image
            src="/icons/warning.svg"
            width={18}
            height={18}
            alt="Warning"
            className={styles.errorIcon}
          />
        )}
      </div>
      {error && <p className={styles.inputError}>{error}</p>}
    </div>
  );
};

export default InputField;
