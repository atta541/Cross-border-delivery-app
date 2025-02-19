


import React, { createContext, useState, useContext } from 'react';

// Define Basket Context
const BasketContext = createContext();

export const useBasket = () => {
  return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addItem = (item) => {
    setBasket((prevBasket) => [...prevBasket, item]);
  };

  const removeItem = (productId) => {
    setBasket((prevBasket) => prevBasket.filter(item => item.productId !== productId));
  };

  const updateItem = (productId, quantity) => {
    setBasket((prevBasket) =>
      prevBasket.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider value={{ basket, addItem, removeItem, updateItem, clearBasket }}>
      {children}
    </BasketContext.Provider>
  );
};
