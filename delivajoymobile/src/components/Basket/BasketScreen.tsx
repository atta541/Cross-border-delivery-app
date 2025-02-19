import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Image, 
} from 'react-native';
import { useBasketFunctions } from './functions'; 

interface BasketItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string; 
}


const BasketScreen = () => {
  const { getBasketItems, removeItem, updateItem, checkoutBasket: performCheckout } = useBasketFunctions(); 
  const [basket, setBasket] = useState<BasketItem[]>([]); 

  useEffect(() => {
    const fetchBasketItems = async () => {
      const items = await getBasketItems();
      if (items) {
        setBasket(items); 
      }
    }; 
    fetchBasketItems(); 
  }, []); 

  const handleUpdateQuantity = (item: BasketItem, quantity: number) => {
    if (quantity > 0) {
      updateItem(item.productId, quantity);
    }
  };

  const handleCheckout = (basket: BasketItem[]) => {
    performCheckout(basket); 
  };

  // Calculate total price
  const total = basket.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return ( 
    <View style={styles.container}>
      <Text style={styles.title}>Your Basket</Text>

      {basket.length > 0 ? (
        <>
          <FlatList
            data={basket}
            keyExtractor={(item) => item.productId}
            renderItem={({ item }) => (
              <View style={styles.basketItem}>
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.productImage} 
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.productName}</Text>
                  <Text style={styles.productPrice}>{item.price.toFixed(2)}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => handleUpdateQuantity(item, item.quantity - 1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => handleUpdateQuantity(item, item.quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.removeItemButton} 
                  onPress={() => removeItem(item.productId)}
                >
                  <Text style={styles.removeItemButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          /> 

          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>Total: {total.toFixed(2)}</Text> 
          </View>  
        </>
      ) : (
        <Text style={styles.emptyBasketText}>Your basket is empty.</Text>
      )}

      {basket.length > 0 && (
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={() => handleCheckout(basket)} 
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );


};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', 
  },
  basketItem: { 
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 8,
  },
  productInfo: { 
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',  
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#777',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  removeItemButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  removeItemButtonText: {
    color: '#B0B0B0',
    fontSize: 14,
  },
  totalPriceContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyBasketText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BasketScreen;