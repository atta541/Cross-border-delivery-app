



import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '@env';


interface Delivery {
  _id: string;
  productName: string;
  deliverystatus: string;
  amount: number;
  deliveryDate: string;
  customerName:string;
  address:string;
  email:string;
  riderId:string;

}

const Order = () => {
  const { userToken } = useContext(AuthContext);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 

  const fetchDeliveries = async () => {
    if (!userToken) {
      setError('User is not authenticated');
      return;
    } 

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/rider-tracking/deliveries`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      const data = await response.json();
      console.log("daya ats",data);

      if (response.ok) {
        setDeliveries(data);
        
      } else {
        setError(data.message || 'Failed to fetch deliveries');
      }
    } catch (err) {
      console.error('Error fetching deliveries:', err);
      setError('Failed to fetch deliveries'); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, [userToken]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your orders</Text>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      {error && <Text style={styles.errorText}>{error}</Text>}
<FlatList
  data={deliveries}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <View style={styles.deliveryItem}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text>Status: {item.deliverystatus}</Text>
      <Text>Amount: {item.amount}</Text>
      <Text>Customer Name: {item.customerName}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Address: {item.address}</Text>
      <Text>Rider ID: {item.riderId}</Text>
      <Text>Delivery Date: {new Date(item.deliveryDate).toLocaleString()}</Text>
    </View>
  )}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  deliveryItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Order;
