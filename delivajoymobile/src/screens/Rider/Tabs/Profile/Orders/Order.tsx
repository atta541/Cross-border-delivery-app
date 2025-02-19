import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CategorySlider from '../../../components/CategorySlider';
import NewOrders from './NewOrders';  // Import the NewOrders component
import ActiveOrders from './ActiveOrders';  // Import the ActiveOrders component
import CompletedOrders from './CompletedOrders';

const Order = () => {
  const [activeCategory, setActiveCategory] = useState<string>('1'); // Default to 'New Orders'

  // Render the category content based on the selected active category
  const renderCategoryContent = () => {
    switch (activeCategory) {
      case '1':
        return <NewOrders />;
      case '2':
        return <ActiveOrders />;
      case '3':
        return <CompletedOrders />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <CategorySlider activeId={activeCategory} setActiveId={setActiveCategory} />
      <Text style={styles.title}>Orders</Text>

      {renderCategoryContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Order;
