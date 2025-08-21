import styles from '@/components/landing/styles/Landing.module.css';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className={styles.landing}>
      <HeroSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
