import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '@env';

const AccountInformation = () => {
  const { userToken, logout } = useContext(AuthContext); // Access user token and logout function
  const [user, setUser] = useState<any>(null); // State to store user data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  const navigation = useNavigation();

  // Fetch user data from the API
  const fetchUserData = async () => {
    if (!userToken) return; // If no token, return early

    setLoading(true);
    try {
              const response = await fetch(`${BASE_URL}/users/me`, {

        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data); // Set user data from response
      } else {
        Alert.alert('Error', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch user data. Please try again later.');
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userToken]); // Re-run effect when token changes

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#40A9FF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Error fetching user data.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* User Info Card */}
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>User Information</Text>
        <View style={styles.cardContent}>
          <Text style={styles.info}>Name: {user.first_name} {user.last_name}</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>Phone: {user.phone}</Text>
          <Text style={styles.info}>Stripe ID: {user.stripeCustomerId}</Text>
        </View>
      </View>

    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    width: '100%',
    marginTop: 30, // Overlapping effect
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContent: {
    gap: 10, // Spaces between items
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  logoutButton: {
    backgroundColor: '#FF4D4F',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#40A9FF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  settingsText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountInformation;

