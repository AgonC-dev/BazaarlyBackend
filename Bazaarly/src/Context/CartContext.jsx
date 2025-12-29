import { createContext, useReducer, useEffect } from "react";
import { CartReducer, initialCartState } from '../reducers/cartReducer'

import { auth } from '../api/firebase';
import { fetchUserCart } from '../api/cartService'


export const CartContext = createContext({
  cart: [],
  dispatch: () => {}
});

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(CartReducer, initialCartState);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in → fetch cart from Firestore
        const cartItems = await fetchUserCart(user.uid);
        dispatch({ type: "SET_CART", payload: cartItems });
      } else {
        // User logged out → clear cart
        dispatch({ type: "SET_CART", payload: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
