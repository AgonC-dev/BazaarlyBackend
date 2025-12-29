import Product from "./Product";
import { fetchProducts } from '../../api/fetchProducts.js'
import styles from './ProductsList.module.css'
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";



export default function ProductsList() {
const { data , isPending, isError } = useQuery({
   queryKey: ['products'],
   queryFn: fetchProducts
})

const [ cartError, setCartError ] = useState(null);

function handleError(message) {
  setCartError(message)
  setTimeout(() => setCartError(null), 3000)
}


const filteredProducts = data?.slice(0, 8)

if (isPending) {
   return <p className={styles.loading}>Products loading...</p>
}

if (isError) {
   return <p className={styles.loading}>Failed to fetch products</p>
}

    return (
      <>
        {cartError && <p className={styles.errorMsg}>{cartError}</p>}

        <div className={styles.productList}>
           {filteredProducts.map(product => (
              <Product 
                 key={product.id}
                 id={product.id}
                 title={product.title}
                 price={product.price}
                 image={product.image}
                 category={product.category}
                 onError={handleError}
                 className={styles.product}
              />
           ))} 
        </div>
      </>
      
    )
}