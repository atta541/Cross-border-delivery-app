import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CategorySlider from '../../../components/CategorySlider';
import { AuthContext } from '../../../../../context/AuthContext';
import { BASE_URL } from '@env';

type Delivery = {
  _id: string;
  productName: string;
  amount: number;
  email: string;
  customerName: string;
  address: string;
  deliverystatus: string;
  deliveryDate: string;
};

const NewOrders = () => {
  const { userToken } = useContext(AuthContext); // Access user token from context
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch available deliveries
  const fetchDeliveries = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/available`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`, // Pass token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setDeliveries(result.data);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch deliveries.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (id: string) => {
    // Show a confirmation alert before accepting the delivery
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to accept this delivery?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Accept',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/assign/${id}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${userToken}`,
                  'Content-Type': 'application/json',
                },
              });

              const result = await response.json();

              if (response.ok && result.message) {
                Alert.alert('Success', result.message);
                fetchDeliveries(); // Refresh deliveries
                setSelectedDelivery(null); // Close modal
              } else {
                Alert.alert('Error', result.message || 'Failed to assign delivery.');
              }
            } catch (error) {
              console.error(error);
              Alert.alert('Error', 'Something went wrong.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Available Deliveries</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={deliveries}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedDelivery(item)}>
              <View style={styles.deliveryItem}>
                <Text>Product: {item.productName}</Text>
                <Text>Amount: ${item.amount}</Text>
                <Text>Status: {item.deliverystatus}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      {selectedDelivery && (
        <Modal visible={true} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Delivery Details</Text>
              <Text>Product: {selectedDelivery.productName}</Text>
              <Text>Amount: ${selectedDelivery.amount}</Text>
              <Text>Email: {selectedDelivery.email}</Text>
              <Text>Customer: {selectedDelivery.customerName}</Text>
              <Text>Address: {selectedDelivery.address}</Text>
              <Text>Status: {selectedDelivery.deliverystatus}</Text>
              <Text>
                Delivery Date:{' '}
                {new Date(selectedDelivery.deliveryDate).toLocaleDateString()}
              </Text>
              <View style={styles.modalActions}>
                <Button
                  title="Accept"
                  onPress={() => handleAccept(selectedDelivery._id)}
                />
              </View>
              <Button title="Close" onPress={() => setSelectedDelivery(null)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default NewOrders;

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
  deliveryItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});


