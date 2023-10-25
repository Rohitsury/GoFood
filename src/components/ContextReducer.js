// ContextReducer.js

import React, { useEffect, useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.cartItems;
    case "ADD":
      return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }];
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "DROP":
      return [];
    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.id) {
          return { ...item, qty: item.qty + action.qty, price: item.price + action.price };
        }
        return item;
      });
    default:
      console.log("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    // Fetch cart items from the server and set them in the state
    const fetchCartItems = async () => {
      try {
        // Make a request to the server to get the user-specific cart items
        const response = await fetch('/api/cart', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          dispatch({ type: 'SET_CART', cartItems: data.cartItems });
        } else {
          console.error('Error fetching cart items:', response.status);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
