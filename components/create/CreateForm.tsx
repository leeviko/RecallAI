'use client';
import styles from './styles/CreateForm.module.css';
import Chat from './Chat';
import { DeckWithoutIds } from '@/lib/schemas/flashcards';
import LoaderInline from '../loader/LoaderInline';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  response: DeckWithoutIds | null | string;
  setResponse: (data: DeckWithoutIds | null | string) => void;
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
  const isStringResponse = typeof response === 'string';
  const isErrorResponse = isStringResponse && response.startsWith('Error');

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.backBtn}>
          <Image
            src="/icons/arrow-full.svg"
            alt="Go back"
            width={32}
            height={32}
          />
          <span>Back to Dashboard</span>
        </Link>
        <h2>Generate study cards with AI</h2>
        <div
          className={`${styles.aiResponse} ${
            isErrorResponse ? styles.error : ''
          } ${isStringResponse ? styles.show : ''} ${
            loading ? styles.loading : ''
          }`}
        >
          <div className={styles.aiLabel}>🤖 AI Response</div>

          {isStringResponse && !loading && (
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
