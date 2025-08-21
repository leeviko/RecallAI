'use client';
import { useState } from 'react';
import Button from '../buttons/Button';
import styles from './styles/FeaturesSection.module.css';
import Image from 'next/image';

const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState<'qa' | 'multichoice' | 'ya'>('qa');

  return (
    <section className={styles.features}>
      <div className={styles.wrapper}>
        <h1>Features</h1>
        <div className={styles.content}>
          <div className={styles.tabs}>
            <button
              className={activeTab === 'qa' ? styles.active : ''}
              onClick={() => setActiveTab('qa')}
            >
              Q/A
            </button>
            <button
              className={activeTab === 'multichoice' ? styles.active : ''}
              onClick={() => setActiveTab('multichoice')}
            >
              Multichoice
            </button>
            <button
              className={activeTab === 'ya' ? styles.active : ''}
              onClick={() => setActiveTab('ya')}
            >
              Yes/No
            </button>
          </div>
        </div>
        <div className={styles.featureImgContainer}>
          <div
            className={`${styles.imgContainer}  ${
              activeTab === 'qa' ? styles.active : ''
            }`}
          >
            <Image
              src="/assets/qa.png"
              alt="Feature Image"
              width={900}
              height={500}
            />
          </div>
          <div
            className={`${styles.imgContainer}  ${
              activeTab === 'multichoice' ? styles.active : ''
            }`}
          >
            <Image
              src="/assets/multichoice.png"
              alt="Feature Image"
              width={900}
              height={500}
            />
          </div>
          <div
            className={`${styles.imgContainer}  ${
              activeTab === 'ya' ? styles.active : ''
            }`}
          >
            <Image
              src="/assets/ya.png"
              alt="Feature Image"
              width={900}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
