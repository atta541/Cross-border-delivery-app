
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
  Button, // Import Image for custom icons
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import { useNavigation } from '@react-navigation/native';
import {BASE_URL} from '@env';


const { width } = Dimensions.get('window');

const CardCollection = () => {
  const { userToken } = useContext(AuthContext); // Access user token from context
  const [cards, setCards] = useState([]); // State to store card data
  const [loading, setLoading] = useState(true); // State for loading status
  const [stripeCustomerId, setStripeCustomerId] = useState(''); // State to store stripeCustomerId
  const navigation = useNavigation();

  // Fetch user data to get the stripeCustomerId
  useEffect(() => {

    const fetchUserData = async () => {
      if (!userToken) return; // Return if no token

      try {
        console.log("a")

        const response = await fetch(`${BASE_URL}/users/me`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setStripeCustomerId(data.stripeCustomerId); // Set the stripeCustomerId
        } else {
          console.error('Error fetching user data:', data.message || 'Something went wrong');
        }
      } catch (error) {
        console.error('Unable to fetch user data. Please try again later.');
      }
    };

    fetchUserData();
  }, [userToken]); // Re-run effect when token changes

  // Fetch card data once the stripeCustomerId is available
  useEffect(() => {
    console.log("a")
    if (!stripeCustomerId) return; // Wait for stripeCustomerId to be available

    axios
      .get(`${BASE_URL}/payments/list-payment-methods/${stripeCustomerId}`)
      .then((response) => {
        setCards(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [stripeCustomerId]); // Re-run when stripeCustomerId changes

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
   

      <Text style={styles.title}>My Card{'\n'}Collection</Text>

      <ScrollView contentContainerStyle={styles.cardsContainer} > {/* Wrap with ScrollView */}
        {cards.map((card, index) => {
          const {
            card: { brand, last4, exp_month, exp_year },
          } = card;
          return (
            <LinearGradient
              key={index}
              colors={['#40A090', '#300080']}
              style={styles.expandedCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >




              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.cardType}>{brand}</Text>
                  <Text style={styles.cardNumber}>{`**** **** **** ${last4}`}</Text>
                </View>
                <View style={styles.cardChip}>
                  <Image
                    source={require('../assets/icons8-chip-card-80.png')}
                    style={styles.cardChipImage}

                  />
                </View>
              </View>


              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>Expires</Text>
                <Text style={styles.balanceAmount}>{`${exp_month}/${exp_year}`}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.footerLabel}>Card Type</Text>
                  <Text style={styles.footerValue}>{brand}</Text>
                </View>
              </View>
            </LinearGradient>
          );
        })}
      </ScrollView> {/* End ScrollView */}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCardScreen')}>
        <Text style={styles.addButtonText}>+ Add new card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(231,245,245,255)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 30,
    lineHeight: 40,
  },
  cardsContainer: {
    alignItems: 'center',
    // paddingBottom: 20, // Add some padding at the bottom to prevent cutoff

  },
  expandedCard: {
    padding: 24,
    borderRadius: 40,
    width: '100%',
    marginTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardHeaderLeft: {
    gap: 8,
  },
  cardType: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 14,
    opacity: 0.8,
  },
  cardChipImage: {
    width: 30,  // Adjust the size of the icon
    height: 30, // Adjust the size of the icon
  },
  cardChip: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    marginTop: 30,
    marginBottom: 30,
  },
  balanceLabel: {
    color: '#FFF',
    opacity: 0.8,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLabel: {
    color: '#FFF',
    opacity: 0.8,
    fontSize: 12,
    marginBottom: 4,
  },
  footerValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  addButton: {
    marginTop: 30,
    height: 60,
    borderWidth: 3,
    borderColor: '#DDD',
    borderStyle: 'dashed',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default CardCollection;








