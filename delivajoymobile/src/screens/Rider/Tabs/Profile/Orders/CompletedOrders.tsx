import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { AuthContext } from '../../../../../context/AuthContext';
import { BASE_URL } from '@env';

type Delivery = {
  _id: string;
  productName: string;
  amount: number;
  customerName: string;
  deliveryDate: string;
};

const CompletedOrders = () => {
  const { userToken } = useContext(AuthContext); // Get the user's token
  const [completedOrders, setCompletedOrders] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch the completed deliveries for the rider
  const fetchCompletedOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/completed`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setCompletedOrders(result.data); 
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch completed orders.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedOrders(); // Fetch completed orders when the component is mounted
  }, []);

  // Render a completed order
  const renderItem = ({ item }: { item: Delivery }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Product: {item.productName}</Text>
      <Text style={styles.orderText}>Customer: {item.customerName}</Text>
      <Text style={styles.orderText}>Amount: ${item.amount}</Text>
      <Text style={styles.orderText}>Date: {new Date(item.deliveryDate).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Orders</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : completedOrders.length === 0 ? (
        <Text>No completed orders found.</Text>
      ) : (
        <FlatList
          data={completedOrders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CompletedOrders;
