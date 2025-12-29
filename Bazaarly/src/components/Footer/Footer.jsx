import facebookIcon from '../../assets/facebook.svg';
import TwitterIcon from '../../assets/twitter.svg';
import InstagramIcon from '../../assets/instagram.svg';
import YoutubeIcon from '../../assets/youtube.svg';
import Linkdin from '../../assets/linkdin.svg';
import styles from './Footer.module.css';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
 
const Categories = [
  'Electronics',
  'Accessories',
  'Apparel',
  'Shoes'
]

export default function Footer() {
 return (
   <>
    <div className={styles.bigContainer}>
      {/* <div className={styles.data}> */}
        <div className={styles.left}>
          <img className={styles.logo} src={logo} alt='Logo'/>
          <p className={styles.text}>Bazaarly is your one-stop shop for modern e-commerce. Discover the latest trends and exclusive products.</p>
          <div className={styles.iconsContainer}>
            <img src={facebookIcon} />
            <img src={TwitterIcon} />
            <img src={InstagramIcon} />
            <img src={YoutubeIcon} />
            <img src={Linkdin} />
          </div>       
        </div>
        <div className={styles.right}>
            <div className={styles.titles}>
                <p className={styles.shopTitle}>Shop</p>
                <p className={styles.companyTitle}>Company</p>
                <p className={styles.supportTitle}>Support</p>
            </div>
            <div className={styles.data}>
                <div className={styles.shop}>
                  {Categories.map(cat => (
                    <Link 
                      className={styles.shopText}
                      to='/products'
                      key={cat}
                      state={{ chosenCategory: cat.toLowerCase()}}
                      >
                       {cat}
                    </Link>
                  ))}
                </div>
                <div className={styles.company}>
                  <Link to='/about' className={styles.companyText}>About Us</Link>
                  <p className={styles.companyText}>Careers</p>
                </div>
                <div className={styles.support}>
                  <Link to='/terms' className={styles.supportText}>FAQ</Link>
                  <Link to='/terms' className={styles.supportText}>Privacy Policy</Link>
                  <Link to='/terms' className={styles.supportText}>Terms of Service</Link>
                </div>
            </div>
        </div>
    </div>
    <div className={styles.lastContainer}>
    <p className={styles.footerText}>© 2025 Bazaarly. All rights reserved</p>
    </div>
   </> 
 )
}