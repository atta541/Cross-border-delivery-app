// import React, { useState, useEffect, useContext } from 'react';
// import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
// import { AuthContext } from '../../../../../context/AuthContext';
// import { BASE_URL } from '@env'; // Make sure to configure your BASE_URL

// type Delivery = {
//   _id: string;
//   productName: string;
//   amount: number;
//   email: string;
//   customerName: string;
//   address: string;
//   deliverystatus: string;
//   deliveryDate: string;
// };

// const ActiveOrders = () => {
//   const { userToken } = useContext(AuthContext); // Get the user's token for authentication
//   const [activeOrders, setActiveOrders] = useState<Delivery[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch the assigned deliveries for the rider
//   const fetchActiveOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/assigned`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const result = await response.json();
//       if (response.ok && result.success) {
//         setActiveOrders(result.data); // Set the fetched orders into state
//       } else {
//         Alert.alert('Error', result.message || 'Failed to fetch active orders.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchActiveOrders(); // Fetch active orders when the component is mounted
//   }, []);

//   // Mark an order as delivered
//   const markAsDelivered = async (orderId: string) => {
//     try {
//       const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/${orderId}/complete`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const result = await response.json();
//       if (response.ok && result.success) {
//         Alert.alert('Success', 'Order marked as delivered.');
//         fetchActiveOrders(); // Refresh the orders list
//       } else {
//         Alert.alert('Error', result.message || 'Failed to update delivery status.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };

//   // Confirm marking an order as delivered
//   const confirmDelivery = (orderId: string) => {
//     Alert.alert(
//       'Confirm Delivery',
//       'Are you sure you want to mark this order as delivered?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Confirm', onPress: () => markAsDelivered(orderId) },
//       ]
//     );
//   };

//   // Render the list of active orders
//   const renderItem = ({ item }: { item: Delivery }) => (
//     <TouchableOpacity style={styles.orderItem} onPress={() => confirmDelivery(item._id)}>
//       <Text style={styles.orderText}>Product: {item.productName}</Text>
//       <Text style={styles.orderText}>Customer: {item.customerName}</Text>
//       <Text style={styles.orderText}>Amount: ${item.amount}</Text>
//       <Text style={styles.orderText}>Status: {item.deliverystatus}</Text>
//     </TouchableOpacity>
//   );

//   return (

    
//     <View style={styles.container}>
//       <Text style={styles.title}>Active Orders</Text>

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={activeOrders}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   orderItem: {
//     padding: 10,
//     marginBottom: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   orderText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default ActiveOrders;





// import React, { useState, useEffect, useContext } from 'react';
// import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation
// import { AuthContext } from '../../../../../context/AuthContext';
// import { BASE_URL } from '@env'; // Ensure BASE_URL is configured

// type Delivery = {
//   _id: string;
//   productName: string;
//   amount: number;
//   email: string;
//   customerName: string;
//   address: string;
//   deliverystatus: string;
//   deliveryDate: string;
// };

// const ActiveOrders = () => {
//   const { userToken } = useContext(AuthContext);
//   const [activeOrders, setActiveOrders] = useState<Delivery[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const navigation = useNavigation(); // Initialize navigation

//   const fetchActiveOrders = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/assigned`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const result = await response.json();
//       console.log("all data returning from backend is ",  result);
//       if (response.ok && result.success) {
//         setActiveOrders(result.data);
//       } else {
//         Alert.alert('Error', result.message || 'Failed to fetch active orders.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchActiveOrders();
//   }, []);

//   const markAsDelivered = async (orderId: string) => {
//     try {
//       const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/${orderId}/complete`, {
//         method: 'PATCH',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const result = await response.json();
//       if (response.ok && result.success) {
//         Alert.alert('Success', 'Order marked as delivered.');
//         fetchActiveOrders();
//       } else {
//         Alert.alert('Error', result.message || 'Failed to update delivery status.');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'Something went wrong.');
//     }
//   };

//   const confirmDelivery = (orderId: string) => {
//     Alert.alert(
//       'Confirm Delivery',
//       'Are you sure you want to mark this order as delivered?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         { text: 'Confirm', onPress: () => markAsDelivered(orderId) },
//       ]
//     );
//   };

//   const chatWithCustomer = () => {
//     navigation.navigate('RiderChatScreen'); // Navigate to RiderChatScreen with email
//   };

//   const renderItem = ({ item }: { item: Delivery }) => (
//     <View style={styles.orderItem}>
//       <Text style={styles.orderText}>Product: {item.productName}</Text>
//       <Text style={styles.orderText}>Customer: {item.customerName}</Text>
//       <Text style={styles.orderText}>Amount: ${item.amount}</Text>
//       <Text style={styles.orderText}>Status: {item.deliverystatus}</Text>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={() => confirmDelivery(item._id)}>
//           <Text style={styles.buttonText}>Mark as Delivered</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.chatButton} onPress={() => chatWithCustomer()}>
//           <Text style={styles.chatButtonText}>Chat with Customer</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Active Orders</Text>

//       {loading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={activeOrders}
//           keyExtractor={(item) => item._id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   orderItem: {
//     padding: 10,
//     marginBottom: 12,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   orderText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   button: {
//     backgroundColor: '#28a745',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   chatButton: {
//     backgroundColor: '#007bff',
//     padding: 10,
//     borderRadius: 5,
//   },
//   chatButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
// });

// export default ActiveOrders;




import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { AuthContext } from '../../../../../context/AuthContext';
import { BASE_URL } from '@env'; // Ensure BASE_URL is configured

type Delivery = {
  _id: string;
  productName: string;
  amount: number;
  email: string;
  customerName: string;
  address: string;
  deliverystatus: string;
  deliveryDate: string;
  userId: string; // Added userId
};

const ActiveOrders = () => {
  const { userToken } = useContext(AuthContext);
  const [activeOrders, setActiveOrders] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation(); // Initialize navigation

  const fetchActiveOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/assigned`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json(); 
      console.log("all data returning from backend is ", result);
      if (response.ok && result.success) {
        setActiveOrders(result.data);
      } else {
        Alert.alert('Error', result.message || 'Failed to fetch active orders.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const markAsDelivered = async (orderId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/rider-tracking/deliveries/${orderId}/complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (response.ok && result.success) {
        Alert.alert('Success', 'Order marked as delivered.');
        fetchActiveOrders();
      } else {
        Alert.alert('Error', result.message || 'Failed to update delivery status.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  const confirmDelivery = (orderId: string) => {
    Alert.alert(
      'Confirm Delivery',
      'Are you sure you want to mark this order as delivered?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => markAsDelivered(orderId) },
      ]
    );
  };

 


  const chatWithCustomer = (userId: string, customerName: string) => {
    navigation.navigate('RiderChatScreen', { userId, customerName });
  };
  
  const renderItem = ({ item }: { item: Delivery }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Product: {item.productName}</Text>
      <Text style={styles.orderText}>Customer: {item.customerName}</Text>
      <Text style={styles.orderText}>Amount: ${item.amount}</Text>
      <Text style={styles.orderText}>Status: {item.deliverystatus}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => confirmDelivery(item._id)}>
          <Text style={styles.buttonText}>Mark as Delivered</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.chatButton} 
          onPress={() => chatWithCustomer(item.userId, item.customerName)} // Pass customerName dynamically
        >
          <Text style={styles.chatButtonText}>Chat with Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Active Orders</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={activeOrders}
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chatButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  chatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ActiveOrders;
