'use client';
import { useState, useEffect, useRef } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import styles from './styles/Chat.module.css';

const initialPrompt = `Summarize the key points from Chapter 3 of 'Introduction to Biology' and turn them into 10 clear question-answer flashcards.`;

const TYPING_SPEED = 12;

const ChatPreview = () => {
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typing animation
  useEffect(() => {
    let typedText = '';
    let charCount = 0;
    setPrompt('');

    const type = () => {
      if (charCount <= initialPrompt.length) {
        typedText = initialPrompt.slice(0, charCount);
        setPrompt(typedText);
        charCount++;
        setTimeout(type, TYPING_SPEED);
      } else {
        setIsTyping(false);
      }
    };
    type();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  const handleSendClick = () => {
    redirect('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={`${styles.container} ${styles.preview}`}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder="Paste your notes here, enter a topic, or describe what you want to learn about..."
        value={prompt}
        onChange={handleChange}
        maxLength={600}
        disabled={isTyping}
      />
      <div className={styles.sendContainer}>
        <button onClick={handleSendClick} disabled={isTyping}>
          <p className={styles.btnText}>
            <span className={styles.wave}>Generate</span>
          </p>
          <Image src="/icons/send.svg" alt="Send" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default ChatPreview;
