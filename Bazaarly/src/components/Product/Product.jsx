import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../../assets/cart2.svg';
import styles from './Product.module.css';
import { auth } from '../../api/firebase';
import { addToCart } from '../../api/cartService';
import { CartContext } from '../../Context/CartContext';

export default function Product({
  id,
  title,
  price,
  image,
  category,
  onError
}) {
  const { dispatch } = useContext(CartContext);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  const needsSize = category === 'apparel' || category === 'shoes';

  function handleButtonClick(e) {
    e.preventDefault();

    if (needsSize) {
      navigate(`/products/${id}`);
    } else {
      addToCartHandler();
    }
  }

  async function addToCartHandler() {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      onError?.('Please log in to add items to your cart!');
      return;
    }
     setAdded(true);

    const productPayload = {
      id,
      title,
      price: Number(price),
      image,
      size: null,        // IMPORTANT: keeps reducer & firestore consistent
      quantity: 1
    };

    // ✅ Optimistic UI update
   
    dispatch({
      type: 'ADD_ITEM',
      payload: productPayload
    });

    try {
      // ✅ Persist to Firebase
      await addToCart(userId, productPayload);

      setTimeout(() => setAdded(false), 1000);
    } catch (err) {
      console.error(err);
      setAdded(false);
      onError?.('Something went wrong. Try again.');
    }
  }

  return (
    <div className={styles.container}>
      <Link to={`/products/${id}`} className={styles.link}>
        <img src={image} alt={title} className={styles.image} />
        <p className={styles.title}>{title}</p>
        <p className={styles.price}>{price.toFixed(2)}$</p>
      </Link>

      <button
        className={`${styles.button} ${added ? styles.added : ''}`}
        onClick={handleButtonClick}
        disabled={added}
      >
        <img src={CartIcon} className={styles.icon} alt="cart" />
        {added
          ? 'Added ✓'
          : needsSize
          ? 'Select Options'
          : 'Add to Cart'}
      </button>
    </div>
  );
}
