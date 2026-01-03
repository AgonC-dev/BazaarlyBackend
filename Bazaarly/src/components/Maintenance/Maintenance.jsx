import React from 'react';
import styles from './Maintenance.module.css';

export default function  Maintenance()  {
 return (
    <div className={styles.container}>
      <div className={styles.glowOrb} />
      
      <div className={styles.card}>
        <span className={styles.floatingEmoji}>🚀</span>
        
        <div className={styles.statusWrapper}>
          <div className={styles.dot} />
          <span className={styles.statusText} style={{ color: '#60a5fa', fontWeight: 'bold' }}>
            SYSTEMS OPTIMIZING
          </span>
        </div>

        <h1 className={styles.title}>Bazaarly</h1>

        <p className={styles.description}>
          We're building the future of commerce. <br /> 
          The bazaar will open its gates shortly.
        </p>

        <div className={styles.badge}>
          Coming Soon... 🛠️
        </div>
      </div>
    </div>
  );
};

