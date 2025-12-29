import styles from './CartItem.module.css';
import TrashIcon from '../../assets/trash.svg?react';
import { auth } from '../../api/firebase';
import { useContext} from 'react';
import { CartContext } from '../../Context/CartContext';
import { deleteCartItem, fetchUserCart } from '../../api/cartService';
 



export default function CartItem({item}) {
const {dispatch} = useContext(CartContext)
const quantity = item.quantity



function IncreaseQuantity() {
  dispatch({type: 'INCREASE_QUANTITY', payload: { id: item.id, size: item.size }})
}

function DecreaseQuantity() {
  dispatch({ type: 'DECREASE_QUANTITY', payload: {id: item.id, size: item.size}})
}

function quantityInputHandler(e) {
  dispatch({
    type: 'SET_QUANTITY',
    payload: { id: item.id, quantity: Number(e.target.value) }
 })
}

async function deleteItemHandler() {
  const user = auth.currentUser;
  if(!user) return;

  dispatch({
    type: "DELETE_ITEM", 
    payload: { id: item.id, size: item.size } // Make sure your reducer uses these to filter
  });

  try {
    
    const idToDelete = item.size ? `${item.id}-${item.size}` : item.id;
    await deleteCartItem(user.uid, idToDelete);

  } catch (err) {
    console.error(err);
    const rollbackCart = await fetchUserCart(user.uid);
    dispatch({ type: "SET_CART", payload: rollbackCart });
  }



}

function quantityBlurHandler() {
  let value = item.quantity;

  if (value === "" || value < 1) value = 1;
  if (value > 25) value = 25;

  dispatch({
    type: 'SET_QUANTITY',
    payload: { id: item.id , size: item.size , quantity: value }
  });
}

const price = Number(item.price);
const totalPrice = price * quantity;
const formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);
const ItemPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price);

 return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={item.image} className={styles.image}/>
        <div className={styles.text}>
        <h5 className={styles.title}>{item.title}</h5>
        {item.size && (
        <div className={styles.sizeWrapper}>
          <span className={styles.sizeLabel}>Size: </span>
          <span className={styles.sizeValue}>{item.size}</span>
        </div>
      )}
        <p className={styles.category}>{item.category}</p>
        </div>
      </div>
      <div className={styles.priceCon}>
       <div className={styles.quantityCon}>
        <p className={styles.price}>{ItemPrice}</p>
        <div className={styles.textbox}>
          <button className={styles.measure} onClick={DecreaseQuantity}>-</button>
          <input
            type='number' 
            value={item.quantity}
            onChange={quantityInputHandler}
            onBlur={quantityBlurHandler}
            max="25"
            min="1"
            />
          <button  className={styles.measure} onClick={IncreaseQuantity} disabled={item.quantity === 25}>+</button>
        </div>    
        </div>
        <div className={styles.delete}>
            <p>{formattedPrice}</p>
            <button className={styles.btn}
             onClick={deleteItemHandler}
            >
              <TrashIcon
                className={styles.icon}
              />
            </button>
        </div>
      </div>
    </div>
 )
}