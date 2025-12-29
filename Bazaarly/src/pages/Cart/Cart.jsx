import CartItem from './CartItem';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import Modal from '../../components/Modal';
 



export default function Cart() {
  const { cart } = useContext(CartContext);
  const [ isCheckOutOpen, setIsCheckOutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isSuccess, setIsSuccess] = useState(false);

  const subTotalPrice = cart.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;

   return total + price * quantity;

}, 0);

 function handleOpenCheckOut() {
   setIsCheckOutOpen(true);
 }

 function handleCloseCheckOut() {
  setIsCheckOutOpen(false);
 }

 function handleCompletePurchase() {
  // 1. Trigger success state
  setIsSuccess(true);
  
  // 2. Wait 2 seconds, then close the modal and reset
  setTimeout(() => {
    handleCloseCheckOut(); 
    // Reset success state after modal closes so it's ready for next time
    setTimeout(() => setIsSuccess(false), 500);
  }, 2200);
}

     const TAX_RATE = 0.15;
     const SHIPPING_FEE = 7.5;

     const taxes = subTotalPrice * TAX_RATE;
     const OrderTotalPrice = subTotalPrice + taxes + SHIPPING_FEE;

    return (
    <div className={styles.pageWrapper}>    
     <h2 className={styles.title}>Your Shopping Cart</h2>
      <div className={styles.container}>  
        <div className={styles.Cartcontainer}>
           
            {cart.length === 0 && <p className={styles.emptyText}>Your Cart is empty!</p>}
            {cart.map((item) => (
                <CartItem 
                  key={item.size ? `${item.id}-${item.size} ` : item.id}
                  item={item}
                />  
            ))}
         </div>
         {cart.length > 0 && (
           <div className={styles.orderContainer}>
                <h2 className={styles.head}>Order Summary</h2>
                <div className={styles.totalPartsCon}>
                    <p className={styles.totalText}>Subtotal</p>
                    <p className={styles.orderPrices}>{subTotalPrice.toFixed(2)}$</p>
                </div>
                <div className={styles.totalPartsCon}>
                    <p className={styles.totalText}>Shipping</p>
                    <p className={styles.orderPrices}>{SHIPPING_FEE}$</p>
                </div>
                <div className={styles.totalPartsCon}>
                    <p className={styles.totalText}>Taxes</p>
                    <p className={styles.orderPrices}>{taxes.toFixed(2)}$</p>
                </div>
                <div className={styles.totalbtn}>
                  <p className={styles.orderText}>Order Total</p>
                  <p className={styles.orderTotal}>{OrderTotalPrice.toFixed(2)}$</p>
                </div>
                <div className={styles.totalCon}>
                    <button className={styles.button} onClick={handleOpenCheckOut}>Proceed to Checkout</button>
                     <Link to='/products' className={styles.button2}>Countinue Shopping</Link>
                </div>
          



    <Modal open={isCheckOutOpen} onCLose={handleCloseCheckOut}>
        <div className={styles.checkoutModal}>
            {!isSuccess ? (
                <>
                    <header className={styles.modalHeader}>
                        <h2>Finalize Order</h2>
                        <p>Confirm your details and payment method</p>
                    </header>

                    <div className={styles.modalBody}>
                        <div className={styles.paymentToggle}>
                            <button 
                                className={paymentMethod === 'card' ? styles.activeTab : ''} 
                                onClick={() => setPaymentMethod('card')}
                            >
                                Credit Card
                            </button>
                            <button 
                                className={paymentMethod === 'cash' ? styles.activeTab : ''} 
                                onClick={() => setPaymentMethod('cash')}
                            >
                                Cash on Delivery
                            </button>
                        </div>

                        <div className={styles.summaryTable}>
                            <div className={styles.summaryRow}>
                                <span>Items ({cart.length})</span>
                                <span>{subTotalPrice.toFixed(2)}$</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{SHIPPING_FEE.toFixed(2)}$</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Taxes</span>
                                <span>{taxes.toFixed(2)}$</span>
                            </div>
                            <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                                <span>Total Amount</span>
                                <span>{OrderTotalPrice.toFixed(2)}$</span>
                            </div>
                        </div>

                        {paymentMethod === 'card' ? (
                            <div className={styles.cardForm}>
                                <input type="text" placeholder="Card Number" className={styles.modalInput} />
                                <div className={styles.inputRow}>
                                    <input type="text" placeholder="MM/YY" className={styles.modalInput} />
                                    <input type="text" placeholder="CVC" className={styles.modalInput} />
                                </div>
                            </div>
                        ) : (
                            <div className={styles.cashNotice}>
                                <p>You will pay <strong>{OrderTotalPrice.toFixed(2)}$</strong> when your order arrives at your door.</p>
                            </div>
                        )}
                    </div>

                    <footer className={styles.modalFooter}>
                        <button className={styles.cancelBtn} onClick={handleCloseCheckOut}>Go Back</button>
                        <button className={styles.confirmBtn} onClick={handleCompletePurchase}>Complete Purchase</button>
                    </footer>
                </>
            ) : (
                /* SUCCESS STATE VIEW */
                <div className={styles.successContainer}>
                    <div className={styles.successIconWrapper}>
                        <svg className={styles.checkmark} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                            <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>
                    </div>
                    <h2 className={styles.successTitle}>Order Confirmed</h2>
                    <p className={styles.successMessage}>
                        Processing your transaction... <br/>
                        Everything looks good!
                    </p>
                </div>
            )}
        </div>
    </Modal>
            </div>
         )}
     </div>
    </div>
    )
}