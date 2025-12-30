import { useNavigate, useParams } from "react-router-dom";
import styles from './ProductsDetail.module.css';
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api/fetchProducts";
import { useContext, useState , useEffect} from "react";
import { CartContext } from "../../Context/CartContext";
import { addToCart, fetchUserCart } from "../../api/cartService";
import { auth } from "../../api/firebase";
import { fetchProducts } from '../../api/fetchProducts';
import Footer from "../../components/Footer/Footer";

export default function ProductDetail() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [ errors, setErrors] = useState(''); 
  const [ activeSection, setActiveSection ] = useState(null);
  const [ selectedSize, setSelectedSize] = useState(undefined); 
  const [ added, setAdded ] = useState(false);
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate()

  const  toggleSection = (section) => {
    setActiveSection(activeSection ===section ? null : section);
  }

  useEffect(() => {
  setSelectedSize(undefined);
  window.scrollTo(0, 0); // Wipes the 'L' so it can't leak into the next product
  setQuantity(1);
}, [productId]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', productId],
    queryFn: () => fetchProduct({ id: productId }),
    enabled: !!productId,
  });

  const { data: suggestions } = useQuery({
    queryKey: [ 'products', 'suggestions'],
    queryFn: () => fetchProducts()
  })

  const needsSize = data?.category === "apparel" || data?.category === "shoes";
  const suggestionsList = suggestions?.filter(p => p.id !== productId).slice(0, 5);

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (isError || !data) return <div className={styles.error}>Product not found</div>;

  async function handleAddToCart() {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    setErrors('Please Log In First')
    setTimeout(() => setErrors(''), 1100);
    return;
  }

  if(needsSize && !selectedSize) {
    setErrors('Please select a size first')
    setTimeout(() => setErrors(''), 1100);
    return;
  }

    setAdded(true);
   
    try {
        await addToCart(userId, 
          {
             id: productId,
             quantity,
             size: needsSize ? selectedSize : null,
             title: data.title,
             price: data.price,
             image: data.image
    });

    const cartItems = await fetchUserCart(userId);
    
    dispatch({
      type: "SET_CART",
      payload: cartItems
    })

    } catch (error) {
      console.error("Cart Error", error);
      setAdded(false);
    }

    setTimeout(() => {
      setAdded(false);
    },2000) 
  
  }

  function handleSuggestionClick(id) {
    navigate(`/products/${id}`);
        window.scrollTo(0, 0);
  }


  return (
<>
  <div className={styles.pageWrapper}>
    <div className={styles.container}>
      {/* LEFT: Main Image Only */}
      <div className={styles.left}>
        <div className={styles.mainImageContainer}>
          <img src={data?.image} className={styles.mainImage} alt={data.title} />
        </div>
        {/* We removed the thumbnail grid from here to keep focus on the current product */}
      </div>

      {/* RIGHT: Product Info */}
      <div className={styles.right}>
        <h1 className={styles.title}>{data.title}</h1>
        <div className={styles.ratingRow}>
          <span className={styles.stars}>★★★★★</span>
          <span className={styles.ratingText}>4.8 (124 Reviews)</span>
        </div>
        <p className={styles.price}>${data.price}</p>
        <p className={styles.description}>{data.description}</p>
        
        <div className={styles.options}>
        {needsSize  ? (
         <div className={styles.sizeSection}>
           <p className={styles.label}>Select Size</p>
         <div className={styles.sizeGrid}>
          {['S', 'M', 'L', 'XL'].map((size) => (
           <button
             key={size}
             className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
             onClick={() => setSelectedSize(size)}
            >
             {size}
           </button>
           ))}
          </div>
        </div>
      ): <p className={styles.noSize}>No size Needed</p>}
          <div className={styles.purchaseActions}>
            <div className={styles.quantitySelector}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button 
              className={`${styles.addToCartBtn} ${added ? styles.added : ''} ${errors ? styles.btnError : ''}`} 
              onClick={handleAddToCart}
              disabled={added}
            >
              {errors ? errors : (added ? 'Added ✓' : "Add to Cart")}
            </button>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className={styles.accordion}>
          <div className={styles.accordionItem} onClick={() => toggleSection('specs')}>
            <span>Specifications</span>
            <span className={`${styles.arrow} ${activeSection === 'specs' ? styles.rotated : ''}`}>▾</span>
          </div>   
          {activeSection === 'specs' && (
            <div className={styles.accordionContent}>
              <p>{data.specifications || "No Specifications listed for this product"}</p>
            </div>
          )}
          
          <div className={styles.accordionItem} onClick={() => toggleSection('materials')}>
            <span>Materials</span>
            <span className={`${styles.arrow} ${activeSection === 'materials' ? styles.rotated : ''}`}>▾</span>
          </div>  
          {activeSection === 'materials' && (
            <div className={styles.accordionContent}>
              <p>{data.materials || 'High quality sourced materials'}</p>
            </div>  
          )} 

          <div className={styles.accordionItem} onClick={() => toggleSection('shipping')}>
            <span>Shipping & Returns</span>
            <span className={`${styles.arrow} ${activeSection === 'shipping' ? styles.rotated : ''}`}>▾</span>
          </div>
          {activeSection === 'shipping' && (
            <div className={styles.accordionContent}>
              <p>Free shipping for orders over $100. 30-day easy returns.</p>
            </div>
          )}
        </div>
      </div>
    </div>
    

    {/* SUGGESTIONS: Moved to the bottom */}
    <div className={styles.suggestionsSection}>
      <h2 className={styles.suggestionTitle}>You Might Also Like</h2>
      <div className={styles.suggestionsGrid}>
        {suggestionsList?.map((item) => (
          <div 
            key={item.id} 
            className={styles.suggestionCard} 
            onClick={() => handleSuggestionClick(item.id)}
          >
            <img src={item.image} alt={item.title} className={styles.suggestionImage} />
            <p className={styles.suggestionName}>{item.title}</p>
            <p className={styles.suggestionPrice}>${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  <Footer />
</>
);
}