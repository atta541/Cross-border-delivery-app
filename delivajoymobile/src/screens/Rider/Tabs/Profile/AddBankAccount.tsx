import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    View,
} from 'react-native';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createToken, StripeProvider, initStripe } from '@stripe/stripe-react-native';
import {BASE_URL} from '@env';


const AddBankAccount: React.FC = () => {
    const [accountNumber, setAccountNumber] = useState('');
    const [routingNumber, setRoutingNumber] = useState('');
    const [country, setCountry] = useState('GB'); // Default to US
    const [currency, setCurrency] = useState('GBP'); // Default to USD
    const [accountHolderName, setAccountHolderName] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        initStripe({
            publishableKey: 'pk_test_eq21gKYPVUHFaaiOsj0h0q0i',
        });
    }, []);

    const handleAddBankAccount = async () => {
        if (!accountNumber || !routingNumber || !accountHolderName) {
            Alert.alert('Error', 'All fields are required.');
            return;
        }

        setLoading(true);

        try {
            const { token, error } = await createToken({
                type: 'BankAccount',
                country,
                currency,
                accountHolderName,
                accountNumber,
                routingNumber,
            });

            if (error) {
                Alert.alert('Error', `Failed to generate token: ${error.message}`);
                return;
            }

            if (!token) {
                Alert.alert('Error', 'Token generation failed.');
                return;
            }

            console.log('Token generated:', token.id);

            // Fetch customer ID from your server
            const customerResponse = await fetch(`${BASE_URL}/users/me`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                },
            });

            const customerData = await customerResponse.json();


            if (!customerData.stripeCustomerId) {
                Alert.alert('Error', 'Customer not found.');
                return;
            }    

            const customerId = customerData.stripeCustomerId;
            // Attach the bank account to the customer
            const attachResponse = await fetch(
                `${BASE_URL}/verification/attach-external-bank-account`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userToken}`,
                    },
                    body: JSON.stringify({
                        account_id: customerId,
                        token: token.id,
                    }),
                },
            );

            const result = await attachResponse.json();

            if (attachResponse.ok) {
                Alert.alert('Success', 'Bank account added successfully!');
                navigation.goBack();
            } else {
                Alert.alert('Error', `Failed to add bank account: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding bank account:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Add Bank Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Account Number"
                keyboardType="number-pad"
                value={accountNumber}
                onChangeText={setAccountNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Routing Number"
                keyboardType="number-pad"
                value={routingNumber}
                onChangeText={setRoutingNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Account Holder Name"
                value={accountHolderName}
                onChangeText={setAccountHolderName}
            />
            <TextInput
                style={styles.input}
                placeholder="Country (GB)"
                value={country}
                onChangeText={setCountry}
            />
            <TextInput
                style={styles.input}
                placeholder="Currency (GBP)"
                value={currency}
                onChangeText={setCurrency}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleAddBankAccount} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.addButtonText}>Add Bank Asccount</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
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
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
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
});

export default AddBankAccount;

