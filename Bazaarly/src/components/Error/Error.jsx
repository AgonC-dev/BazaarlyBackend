import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import styles from './Error.module.css';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.glowOrb} />
      
      <div className={styles.content}>
        <h1 className={styles.errorCode} data-text="404">
          {error.status || "404"}
        </h1>
        
        <div className={styles.statusWrapper}>
          <div className={styles.dot} />
          <span className={styles.statusText}>Connection Interrupted</span>
        </div>

        <h2 className={styles.title}>Lost in the Bazaar?</h2>
        
        <p className={styles.description}>
          We couldn't find the page you're looking for. It might have been moved, 
          or it never existed in this dimension.
        </p>

        <button 
          onClick={() => navigate('/')} 
          className={styles.homeButton}
        >
          Return to Marketplace
        </button>
      </div>
    </div>
  );
};

