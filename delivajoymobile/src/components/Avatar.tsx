import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '@env';

interface AvatarProps {
  imageUrl?: string;
}

const Avatar = ({ imageUrl }: AvatarProps) => {
  const { userToken } = useContext(AuthContext);  // Access the token from AuthContext
  const [user, setUser] = useState<any>(null);    // State to store user data
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userToken) return;  // If no token, return early

      try {
        console.log('a');

        const response = await fetch(`${BASE_URL}/users/me`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);  // Set user data from response
        } else {
          Alert.alert('Error', data.message || 'Something went wrong');
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userToken]);  // Re-run effect when token changes

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>  {/* You can show a loader here */}
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
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={imageUrl ? { uri: imageUrl } : require('../assets/google-icon.png')}
          style={styles.avatar}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello {user.first_name} {user.last_name}</Text>
        <Text style={styles.welcomeText}>Good morning!</Text>
      </View>
      {/* Bell Icon */}
      <View style={styles.bellContainer}>
        <Image
          source={require('../assets/icons8-bell-50.png')}
          style={styles.bellIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8E0FF',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  bellContainer: {
    marginLeft: 12,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 20,
  },
  bellIcon: {
    width: 24,
    height: 24,
  },
});

export default Avatar;
