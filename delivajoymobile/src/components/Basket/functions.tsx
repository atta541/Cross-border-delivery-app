import { BASE_URL } from '@env';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

interface BasketItem {
  productId: string;
  quantity: number;
}
export const useBasketFunctions = () => {
    const { userToken } = useContext(AuthContext);
  
    // Function to add item to the basket
    const addItemToBasket = async (productId: string, quantity: string) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/cart/add`,
          {
            items: [
              {
                productId,
                quantity,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log('Item added to basket:', response.data);
      } catch (error) {
        console.error('Error adding item to basket:', error);
      }
    };
  
    // Function to get items from the basket
    const getBasketItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cart/items`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log('Basket items:', response.data.items);
        return response.data.items;
      } catch (error) {
        console.error('Error fetching basket items:', error);
      }
    };
  
    // Function to checkout the basket
    // const checkoutBasket = async (basket: BasketItem[]) => {
    //   try {
    //     const checkoutResponse = await axios.post(
    //       `${BASE_URL}/cart/checkout`,
    //       {
    //         items: basket.map((item) => ({
    //           productId: item.productId,
    //           quantity: item.quantity,
    //         })),
    //       },
        
    //       {
    //         headers: {
    //           Authorization: `Bearer ${userToken}`,
    //         },
    //       }
    //     );
    //     console.log('Checkout completed:', checkoutResponse.data);
    //   } catch (error) {
    //     console.error('Checkout failed:', error);
    //   }
    // };
  

    const checkoutBasket = async (basket: BasketItem[]) => {
      try { 

        console.log('Basket itemsssssssssssssssssss:', basket);

        // Map the basket to include all items, handling items without a productId
        const items = basket.map((item) => ({
          productId: item.productId || null, // Use `null` if `productId` is missing
          quantity: item.quantity,
          type: item.productId ? 'valid' : 'unknown', // Add a type to distinguish valid/invalid
        }));
    
        const checkoutResponse = await axios.post(
          `${BASE_URL}/cart/checkout`,
          { items },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
    
        console.log('Checkout completed:', checkoutResponse.data);
      } catch (error) {
        console.error('Checkout failed:', error);
      }
    };
    
  

    const removeItem = async (productId: string) => {
        try {
          const response = await axios.delete(
            `${BASE_URL}/cart/remove`,
            {
              data: { productId },  // Pass productId as data for DELETE request
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log('Item removed from basket:', response.data);
        } catch (error) {
          console.error('Error removing item from basket:', error);
        }
      };
      


    // Function to update item quantity in the basket
    const updateItem = async (productId: string, quantity: number) => {
      try {
        const response = await axios.put(
          `${BASE_URL}/cart/update`,
          { productId, quantity },
          {
            headers: {
          
              Authorization: `Bearer ${userToken}`,

            },
          }


        );
        console.log('Item quantity updated:', response.data);

      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    };
  
   
  
    return {
      addItemToBasket,
      getBasketItems,
      checkoutBasket,
      removeItem,
      updateItem,
    //   clearBasket,
    };
  };
  