import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

import facebookIcon from '../../assets/facebook.svg';
import TwitterIcon from '../../assets/twitter.svg';
import InstagramIcon from '../../assets/instagram.svg';
import YoutubeIcon from '../../assets/youtube.svg';
import Linkdin from '../../assets/linkdin.svg';
import logo from '../../assets/logo.png';

const Categories = ['Electronics', 'Accessories', 'Apparel', 'Shoes'];

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.bigContainer}>
        <div className={styles.left}>
          {/* Bigger Logo */}
          <img className={styles.logo} src={logo} alt='Bazaarly Logo'/>
          <p className={styles.text}>
            Bazaarly is your one-stop shop for modern e-commerce. 
            Discover the latest trends and exclusive products.
          </p>
          <div className={styles.iconsContainer}>
            <img src={facebookIcon} alt="FB" />
            <img src={TwitterIcon} alt="TW" />
            <img src={InstagramIcon} alt="IG" />
            <img src={YoutubeIcon} alt="YT" />
            <img src={Linkdin} alt="IN" />
          </div>       
        </div>

        <div className={styles.right}>
          <div className={styles.data}>
            <div className={styles.footerColumn}>
              <p className={styles.columnTitle}>Shop</p>
              {Categories.map(cat => (
                <Link className={styles.linkText} to='/products' key={cat} state={{ chosenCategory: cat.toLowerCase() }}>
                  {cat}
                </Link>
              ))}
            </div>

            <div className={styles.footerColumn}>
              <p className={styles.columnTitle}>Company</p>
              <Link to='/about' className={styles.linkText}>About Us</Link>
            </div>

            <div className={styles.footerColumn}>
              <p className={styles.columnTitle}>Support</p>
              <Link to='/terms' className={styles.linkText}>FAQ</Link>
              <Link to='/terms' className={styles.linkText}>Privacy Policy</Link>
              <Link to='/terms' className={styles.linkText}>Terms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* This is the copyright bar that was missing/hidden */}
      <div className={styles.lastContainer}>
        <p className={styles.footerText}>© 2025 Bazaarly. All rights reserved</p>
      </div>
    </footer>
  );
}