import styles from './styles/CreateForm.module.css';
import Chat from './Chat';
import { DeckResponse } from '@/lib/schemas/flashcards';

type Props = {
  data: DeckResponse | null | string;
  setData: (data: DeckResponse | string) => void;
  setGenerated: (generated: boolean) => void;
};

const CreateForm = ({ data, setData, setGenerated }: Props) => {
  const isResponseString = typeof data === 'string';
  const isErrorResponse = isResponseString && data.startsWith('Error');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Generate Flashcards with AI</h2>
        <p className={styles.subtitle}>
          Use the power of AI to create personalized flashcards effortlessly.
        </p>
        <div
          className={`${styles.aiResponse} ${
            isErrorResponse ? styles.error : ''
          } ${isResponseString ? styles.show : ''}`}
        >
          {isResponseString && (
            <>
              <div className={styles.aiLabel}>🤖 AI Response</div>
              <p>{isErrorResponse ? data.slice(7) : data}</p>
            </>
          )}
        </div>
        <Chat data={data} setData={setData} setGenerated={setGenerated} />
        <div className={styles.footer}>
          <h3>Help</h3>
          <p>
            💡You can generate <strong>multichoice</strong>,{' '}
            <strong>yes/no</strong>, or <strong>normal question/answer</strong>{' '}
            flashcards. If you don't specify, it will mix them.
          </p>
          <p>
            💡Example prompts:
            <br />- "Most common React developer interview questions. Use only
            qa cards." <br />- "Explain the basics of machine learning. Create
            15 flashcards."
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
