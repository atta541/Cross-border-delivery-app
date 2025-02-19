// import { StyleSheet, Text, View, Button } from 'react-native';
// import React, { useState } from 'react';
// import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
// import app from '../../../firebaseConfig'; // Import the firebaseConfig

// const db = getFirestore(app); // Initialize Firestore with the app instance

// const OrderHistory = () => {
//   const [message, setMessage] = useState('');

//   // Function to test Firestore connection
//   const testFirestoreConnection = async () => {
//     try {
//       // Corrected: Use collection() to get a reference to a collection
//       const docRef = doc(collection(db, "testCollection"), "testDoc"); // Reference to the document in the collection
//       await setDoc(docRef, {
//         testField: "Firebase is connected successfully!",
//       });

//       setMessage("Firestore connection successful: Test document written!");
//     } catch (error: any) { // Explicitly typing 'error' as 'any'
//       setMessage("Firestore connection failed: " + error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>{message || "Press the button to test Firestore connection"}</Text>
//       <Button title="Test Firestoree" onPress={testFirestoreConnection} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
// });

// export default OrderHistory;



import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { database } from '../../../firebaseConfig'; // Corrected import for the named export

const OrderHistory = () => {
  const [message, setMessage] = useState('');
  const [realTimeMessage, setRealTimeMessage] = useState('');

  // Function to write data to Realtime Database
  const testRealtimeDatabaseConnection = async () => {
    try {
      const dbRef = ref(database, 'orders/testOrder'); // Reference to 'orders/testOrder' node
      await set(dbRef, {
        orderStatus: 'Order created successfully by atta ur rehman',
        timestamp: new Date().toISOString(),
      });

      setMessage('Realtime Database: Test order written!');
    } catch (error: any) { // Explicitly typing 'error' as 'any'
      setMessage('Failed to write to Realtime Database: ' + error.message);
    }
  };

  // Function to listen for changes in Realtime Database
  useEffect(() => {
    const dbRef = ref(database, 'orders/testOrder'); // Listen to changes on the same node
    const unsubscribe = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRealTimeMessage(`Order Status: ${data.orderStatus}`);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe when the component unmounts
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message || 'Press the button to test Realtime Database connection'}</Text>
      <Button title="Test Realtime Database" onPress={testRealtimeDatabaseConnection} />
      <Text>{realTimeMessage || 'Waiting for real-time data...'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default OrderHistory;
