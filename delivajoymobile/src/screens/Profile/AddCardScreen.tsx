// import React, { useState, useContext, useEffect } from 'react';
// import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import { createToken, StripeProvider, CardField, initStripe } from '@stripe/stripe-react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const AddCardScreen: React.FC = () => {
//   const [cardDetails, setCardDetails] = useState<any>({});
//   const navigation = useNavigation();
//   const { userToken } = useContext(AuthContext); // Assuming you might use this later
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     initStripe({
//       publishableKey: 'pk_test_eq21gKYPVUHFaaiOsj0h0q0i',
//     });
//   }, []);

//   const handleAddCard = async () => {
//     setLoading(true);

//     try {
//       // Generate token using card details
//       const { token, error } = await createToken({ type: 'Card', ...cardDetails });

//       if (error) {
//         Alert.alert('Error', `Failed to generate token: ${error.message}`);
//         return;
//       }

//       if (!token) {
//         Alert.alert('Error', 'Token generation failed.');
//         return;
//       }

//       console.log('Token generated:', token.id);

//       // Get the Stripe customer ID dynamically
//       const response = await fetch('http://192.168.1.5:3001/users/me', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`, // JWT token for authentication
//         },
//       });

//       const customerData = await response.json();

//       if (!response.ok) {
//         Alert.alert('Error', `Failed to get customer ID: ${customerData.message || 'Unknown error'}`);
//         return;
//       }

//       const customerId = customerData.stripeCustomerId;

//       // Prepare payload for API
//       const payload = {
//         customerId: customerId, // Use dynamic customer ID
//         token: token.id, // Stripe token
//       };

//       // Send the token to the API
//       const apiResponse = await fetch('http://192.168.1.5:3001/payments/create-payment-method', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${userToken}`, // JWT token for authentication
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await apiResponse.json();

//       if (apiResponse.ok) {
//         Alert.alert('Success', 'Card added successfully!');
//         console.log('API Response:', result);
//         navigation.goBack(); // Navigate back if required
//       } else {
//         Alert.alert('Error', `Failed to add card: ${result.message || 'Unknown error'}`);
//         console.error('API Error:', result);
//       }
//     } catch (err) {
//       console.error('Error adding card:', err);
//       Alert.alert('Error', 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <StripeProvider publishableKey="pk_test_eq21gKYPVUHFaaiOsj0h0q0i">
//       <SafeAreaView style={styles.container}>
//         <Text style={styles.title}>Add Nlknew Card</Text>
//         <CardField
//           postalCodeEnabled={false}
//           placeholders={{
//             number: '4242 4242 4242 4242',
//           }}
//           cardStyle={{
//             backgroundColor: '#FFFFFF',
//             textColor: '#000000',
//           }}
//           style={styles.cardField}
//           onCardChange={(details) => setCardDetails(details)}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={handleAddCard} disabled={loading}>
//           {loading ? (
//             <ActivityIndicator size="small" color="#FFF" />
//           ) : (
//             <Text style={styles.addButtonText}>Add Card</Text>
//           )}
//         </TouchableOpacity>
//       </SafeAreaView>
//     </StripeProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   cardField: {
//     height: 50,
//     marginVertical: 20,
//   },
//   addButton: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddCardScreen;




import React, { useState, useContext, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Switch, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { createToken, StripeProvider, CardField, initStripe } from '@stripe/stripe-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BASE_URL } from '@env';

const AddCardScreen: React.FC = () => {
  const [cardDetails, setCardDetails] = useState<any>({});
  const [setAsDefault, setSetAsDefault] = useState<boolean>(false); // New state for "set as default"
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    initStripe({
      publishableKey: 'pk_test_eq21gKYPVUHFaaiOsj0h0q0i',
    });
  }, []);

  const handleAddCard = async () => {
    setLoading(true);

    try {
      const { token, error } = await createToken({ type: 'Card', ...cardDetails });

      if (error) {
        Alert.alert('Error', `Failed to generate token: ${error.message}`);
        return;
      }

      if (!token) {
        Alert.alert('Error', 'Token generation failed.');
        return;
      }

      console.log('Token generated:', token.id);


      // const response = await fetch(`${BASE_URL}/users/me`, {
      
        const response = await fetch('http://192.168.1.2:3001/users/me', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      const customerData = await response.json();

      if (!response.ok) {
        Alert.alert('Error', `Failed to get customer ID: ${customerData.message || 'Unknown error'}`);
        return;
      }

      const customerId = customerData.stripeCustomerId;

      const payload = {
        customerId: customerId,
        token: token.id,
        setAsDefault: setAsDefault, // Pass the setAsDefault flag
      };
      console.log('a');


      // const apiResponse = await fetch(`${BASE_URL}/payments/create-payment-method`, {
        const apiResponse = await fetch('http://192.168.1.2:3001/payments/create-payment-method', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await apiResponse.json();

      if (apiResponse.ok) {
        Alert.alert('Success', 'Card added successfully!');
        console.log('API Response:', result);
        navigation.goBack();
      } else {
        Alert.alert('Error', `Failed to add card: ${result.message || 'Unknown error'}`);
        console.error('API Error:', result);
      }
    } catch (err) {
      console.error('Error adding card:', err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StripeProvider publishableKey="pk_test_eq21gKYPVUHFaaiOsj0h0q0i">
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>nowAdd New Card</Text>

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={styles.cardField}
          onCardChange={(details) => setCardDetails(details)}
        />

        <View style={styles.switchContainer}>
          <Text>Set as Default Card</Text>
          <Switch 
            value={setAsDefault} 
            onValueChange={(value) => setSetAsDefault(value)} 
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCard} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.addButtonText}>Add Card</Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cardField: {
    height: 50,
    marginVertical: 20,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default AddCardScreen;
