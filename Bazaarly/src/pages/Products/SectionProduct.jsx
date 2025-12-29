import Footer from '../../components/Footer/Footer';
import styles from './SectionProduct.module.css';
import Product from '../../components/Product/Product';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../api/fetchProducts';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { auth } from '../../api/firebase';

export default function SectionProduct() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [LogInError, setLogInError] = useState('');

  
  // 1. FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [maxPrice, setMaxPrice] = useState(500);

  // Define categories EXACTLY as they appear in your backend
  const backendCategories = ['electronics', 'accessories', 'apparel', 'shoes', 'home&living'];

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

 

  useEffect(() => {
    if(location.state && location.state.chosenCategory ) {
      const sanitizedCat = location.state.chosenCategory.toLowerCase().replace(/\s/g, '');
      setSelectedCategory(sanitizedCat);
      
      window.history.replaceState({}, document.title);
      window.scrollTo(0, 0);
    }
   
  }, [location.state])

  useEffect(() => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setLogInError('Please Log In to add items to your cart');
    }
    const timer = setTimeout(() => setLogInError(''), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <p className={styles.loading}>Loading...</p>;
  if (isError) return <p className={styles.loading}>Failed to fetch products...</p>;

  // 2. FILTER LOGIC (Case-insensitive to be safe)
  const filteredProducts = data.filter(product => {
    const productCat = product.category?.toLowerCase() || "";
    const selectedCat = selectedCategory?.toLowerCase();

    const matchesCategory = !selectedCategory || productCat === selectedCat;
    const matchesPrice = product.price <= maxPrice;

    return matchesCategory && matchesPrice;
  });

  // 3. PAGINATION LOGIC
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  
  // Logic to prevent out-of-bounds pages when filtering
  const safePage = currentPage > totalPages ? 1 : currentPage;
  const startIndex = (safePage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const disablePrevious = safePage === 1;
  const disableNext = safePage === totalPages;

  const clearFilters = () => {
    setSelectedCategory(null);
    setMaxPrice(500);
    setCurrentPage(1);
  };

  console.log(visibleProducts)

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filtersCon}>
          <h2 className={styles.filterText}>Filters</h2>
          <h4 className={styles.categoriesTitle}>Categories</h4>

          <ul className={styles.categoriesList}>
            {backendCategories.map((cat) => (
              <li key={cat} className={styles.categoriesText}>
                <button 
                  className={selectedCategory === cat ? styles.buttonActive : styles.button}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {/* Capitalize first letter and fix ampersand for UI display */}
                  {cat.charAt(0).toUpperCase() + cat.slice(1).replace('&', ' & ')}
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.priceCon}>
            <h1 className={styles.priceTitle}>Price Range</h1>
            <input 
              className={styles.slider} 
              type='range' 
              min="0" 
              max="500" 
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
            />
            <div className={styles.pricesPoint}>
              <p className={styles.pricesValue}>$0</p>
              <p className={styles.pricesValue}>${maxPrice}</p>
            </div>
            
            <div className={styles.textbox}>
              <input className={styles.leftInput} type="number" placeholder='0' readOnly value={0}/>
              <input type="number" placeholder='500' value={maxPrice} readOnly/>
            </div>

            <button className={styles.filtersClearBtn} onClick={clearFilters}>
              Clear All Filters
            </button>
          </div>
        </div>

        <div className={styles.productsCon}>
          <h1 className={styles.productsTitle}>
            {LogInError && <span className={styles.error}>{LogInError}</span>}
            {selectedCategory ? `Category: ${selectedCategory.toUpperCase()}` : "All Products"}
          </h1>

          <div className={styles.products}>
            {visibleProducts.length > 0 ? (
              visibleProducts.map(product => (
                <Product 
                  key={product.id} 
                  className={styles.productItem}
                  onError={LogInError}
                  {...product} 
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No products match your filters.</p>
                <button onClick={clearFilters}>View All Products</button>
              </div>
            )}
          </div>

          <div className={styles.naviCon}>
            <button 
              className={styles.first}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={disablePrevious}
            >
              Previous
            </button>
            <p className={styles.pageNum}>{currentPage}</p>
            <button 
              className={styles.first}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={disableNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <Footer className={styles.footer} />
    </>
  );
}