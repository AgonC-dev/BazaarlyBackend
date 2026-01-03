import React from 'react';
import styles from './Loading.module.css'; // Import as a styles object

export default function Loading({ message = "Loading Bazaarly..." }) {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.bazaarlySpinner}></div>
      <p className={styles.loaderText}>{message}</p>
    </div>
  );
}

