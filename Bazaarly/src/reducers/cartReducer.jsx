export const initialCartState = [];


export function CartReducer(state, action) {
    if(action.type === "ADD_ITEM") {
      const exsitingItem = state.find(item => item.id === action.payload.id && item.size === action.payload.size)
      
      if(exsitingItem) {
        return state.map(item =>
            item.id === action.payload.id  && item.size === action.payload.size?
            {... item, quantity: item.quantity + 1} :
            item
        );
      } else {
        return [...state, {...action.payload, quantity: 1 || 1}]
      }
     
    }

    if (action.type === "INCREASE_QUANTITY") {
      const itemId  = action.payload.id;
      return state.map(item =>
        item.id === itemId && item.size === action.payload.size ? { ...item, quantity: item.quantity + 1}
        : item 
      );
    }

    if (action.type === "SET_QUANTITY") {
      return state.map(item =>
      item.id === action.payload.id && item.size === action.payload.size
       ? { ...item, quantity: action.payload.quantity }
       : item
   );

}
 
   if (action.type === "DECREASE_QUANTITY") {
    const updatedCart = state.map(item =>
      item.id === action.payload.id && item.size === action.payload.size
       ? { ...item, quantity: Math.max(0, item.quantity - 1)}
       : item
    ).filter(item => item.quantity > 0)
  
     return updatedCart 
   }

   if(action.type === "DELETE_ITEM") {
      return state.filter(item => !(item.id === action.payload.id && item.size === action.payload.size));
   }

   if(action.type === "SET_CART") {
     return  action.payload || []
   }

    return state
}

