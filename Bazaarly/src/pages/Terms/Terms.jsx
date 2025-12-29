import { useEffect } from 'react';
import styles from './Terms.module.css';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.container}>
      {/* --- PRIVACY SECTION --- */}
      <section className={styles.section}>
        <h1 className={styles.mainTitle}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: December 2025</p>
        <div className={styles.content}>
          <h2>1. Data Collection</h2>
          <p>At Bazaarly, we value your privacy. We only collect information that you voluntarily provide through our contact form (Name and Email). This data is used solely to respond to your inquiries.</p>
          <h2>2. Use of Information</h2>
          <p>Your information is never sold, traded, or rented to third parties. We use Formspree to process contact requests.</p>
          <h2>3. Cookies</h2>
          <p>We use local storage to remember your cart items and preferences to provide a seamless experience.</p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* --- TERMS SECTION --- */}
      <section className={styles.section}>
        <h1 className={styles.mainTitle}>Terms of Service</h1>
        <div className={styles.content}>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing Bazaarly, you agree to use this platform for personal use. This is a portfolio project; no real financial transactions take place.</p>
          <h2>2. Intellectual Property</h2>
          <p>All design elements, code, and custom logic are the property of Lis Citaku.</p>
        </div>
      </section>

      <div className={styles.divider} />

      {/* --- FAQ SECTION --- */}
      <section className={styles.section}>
        <h1 className={styles.mainTitle}>Frequently Asked Questions</h1>
        <div className={styles.content}>
          <div className={styles.faqItem}>
            <h2 className={styles.faqQuestion}>How many people worked on this project?</h2>
            <p>Bazaarly is a solo project developed entirely by <strong>Lis Citaku</strong>. This includes the UI design, frontend logic, and integration with the commerce APIs.</p>
          </div>

          <div className={styles.faqItem}>
            <h2 className={styles.faqQuestion}>Are the products real?</h2>
            <p>The products shown are fetched via API for demonstration purposes. While they look real, this is a simulated e-commerce environment designed to showcase development skills.</p>
          </div>

          <div className={styles.faqItem}>
            <h2 className={styles.faqQuestion}>What technologies were used?</h2>
            <p>The site is built using React.js, CSS Modules for styling, and Formspree for handling communications.</p>
          </div>
        </div>
      </section>
    </div>
  );
}