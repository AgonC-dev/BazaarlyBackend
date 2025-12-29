import styles from './Header.module.css';
import { Link } from 'react-router-dom'

export default function Header() {
   return (
    <div className={styles.background}>
      <div className={styles.container}>
         <p className={styles.title}>Elevate Your Style,<br/>Redefine Your World</p>
         <p className={styles.description}>Discover exclusive collections and the latest trends in fashion, electronics, and home essentials. Shop now and experience the future of premium e-commerce.</p>
         <Link to='/products' className={styles.button}>Shop Our Collections</Link>
      </div>
    </div>
   ) 
}