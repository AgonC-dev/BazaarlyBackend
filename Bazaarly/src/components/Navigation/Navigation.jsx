import { NavLink, Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css'
import searchIcon from '../../assets/SearchBar.svg';
import CartIcon from '../../assets/Cart.svg';
import Profile from '../../assets/Profili.jpg';
import logo from '../../assets/logo.png';
import { useContext, useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../api/firebase';
import { CartContext } from '../../Context/CartContext';
import HomeIcon from '../../assets/home-phone-icon.svg';
import ProductsIcon from '../../assets/products-phone-icon.svg';
import AboutIcon from '../../assets/about-phone-icon.svg';
import ContactIcon from '../../assets/contact-phone-icon.svg';


export default function Navigation() {
const [ user, setUser ] = useState(null);
const [ showDropdown, setShowDropdown ] = useState(false);

const navigate = useNavigate();
const { cart }= useContext(CartContext);

const cartItemNum = cart.length;

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  });

  const handleOutsideClick = () => {
    setShowDropdown(false);
  };

   window.addEventListener('click', handleOutsideClick);
   
  return () => {
    unsubscribe();
    window.removeEventListener('click', handleOutsideClick);
  } 
}, [])

const handleProfileClick = (e) => {
 e.stopPropagation();

  if(!user) {
    navigate('/login');
  } else {
    setShowDropdown(!showDropdown);
  }
}

const handleLogout = async () => {
  await signOut(auth);
  setShowDropdown(false);
  navigate('/')
}

 return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link to='/'><img src={logo} className={styles.logo} alt='Logo'/></Link>
          <ul className={styles.list}> 
            <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
              `${styles.navButton} ${isActive ? styles.active : ''}`
              }
              >
                Home
               
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                `${styles.navButton} ${isActive ? styles.active : ''}`
                }
              >
                Products
            
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                `${styles.navButton} ${isActive ? styles.active : ''}`
                }
              >
                About
            
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                `${styles.navButton} ${isActive ? styles.active : ''}`
                }
              >
                Contact
         
              </NavLink>
            </li>   
          </ul>
        </div>
        <div className={styles.right}>
          <button className={styles.search}>
            <img src={searchIcon} />
          </button>
          <button className={styles.search}>
            <Link to='cart'><img src={CartIcon} /></Link>
            <p className={styles.cartItemNum}>
              {cartItemNum > 0 && `(${cartItemNum})`}
            </p>
          </button>
          <div className={styles.profileWrapper}>
            <button className={`${styles.avatar} ${user ? styles.loggedIn : ''}`} onClick={handleProfileClick}>
              <img src={Profile} />
            </button>
            {user && showDropdown && (
              <div className={styles.dropdown}>
                <div className={styles.userInfo}>
                  <p>{user.email}</p>
                </div>
                <hr className={styles.break}/>
                <Link to="/profile" onClick={() => setShowDropdown(false)} className={styles.profileClick}>View Profile</Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Only appears on mobile */}
      <ul className={styles.mobileBottomNav}>
  <li>
    <NavLink to="/" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
      <img src={HomeIcon} alt='Home' />
      <span>Home</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/products" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
      <img src={ProductsIcon} alt='Products' />
      <span>Products</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/about" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
      <img src={AboutIcon} alt='About' />
      <span>About</span>
    </NavLink>
  </li>
  <li>
    <NavLink to="/contact" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
      <img src={ContactIcon} alt='Contact' />
      <span>Contact</span>
    </NavLink>
  </li>
</ul>
    </>
 )
}