import styles from './styles/CreateForm.module.css';
import Chat from './Chat';
import { DeckResponse } from '@/lib/schemas/flashcards';
import LoaderInline from '../loader/LoaderInline';

type Props = {
  response: DeckResponse | null | string;
  setResponse: (data: DeckResponse | string) => void;
  setGenerated: (generated: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

const CreateForm = ({
  response,
  setResponse,
  setGenerated,
  loading,
  setLoading,
}: Props) => {
  const isResponseString = typeof response === 'string';
  const isErrorResponse = isResponseString && response.startsWith('Error');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Generate study cards with AI</h2>
        <div
          className={`${styles.aiResponse} ${
            isErrorResponse ? styles.error : ''
          } ${isResponseString ? styles.show : ''} ${
            loading ? styles.loading : ''
          }`}
        >
          <div className={styles.aiLabel}>🤖 AI Response</div>
          {isResponseString && !loading && (
            <p>{isErrorResponse ? response.slice(7) : response}</p>
          )}
          {loading && <LoaderInline color="white" />}
        </div>
        <Chat
          response={response}
          setResponse={setResponse}
          setGenerated={setGenerated}
          loading={loading}
          setLoading={setLoading}
        />
        <div className={styles.help}>
          <div className={styles.helpContent}>
            <span>💡</span>
            <p>
              You can generate <strong>multichoice</strong>,{' '}
              <strong>yes/no</strong>, or{' '}
              <strong>normal question/answer</strong> cards. If you don't
              specify, it will mix them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
