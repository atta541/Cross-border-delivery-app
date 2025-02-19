// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
// import { AuthContext } from '../context/AuthContext';
// import { useNavigation } from '@react-navigation/native';

// const ProfilePage = () => {
//   const { userToken, logout } = useContext(AuthContext); // Access user token and logout function
//   const [user, setUser] = useState<any>(null); // State to store user data
//   const [loading, setLoading] = useState<boolean>(true); // State for loading status
//   const [refreshing, setRefreshing] = useState(false); // State for refresh control

//   const navigation = useNavigation();

//   // Fetch user data from the API
//   const fetchUserData = async () => {
//     if (!userToken) return; // If no token, return early

//     setLoading(true);
//     try {
//       const response = await fetch('http://192.168.1.4:3001/users/me', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUser(data); // Set user data from response
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch user data. Please try again later.');
//     } finally {
//       setLoading(false);
//       setRefreshing(false); // Stop refreshing
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userToken]); // Re-run effect when token changes

//   // Handle pull-to-refresh
//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchUserData();
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#40A9FF" />
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text>Error fetching user data.</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//     >
//       {/* User Info Card */}
//       <View style={styles.profileCard}>
//         <Text style={styles.cardTitle}>User Information</Text>
//         <View style={styles.cardContent}>
//           <Text style={styles.info}>Name: {user.first_name} {user.last_name}</Text>
//           <Text style={styles.info}>Email: {user.email}</Text>
//           <Text style={styles.info}>Phone: {user.phone}</Text>
//           <Text style={styles.info}>Stripe ID: {user.stripeCustomerId}</Text>
//         </View>
//       </View>

//       {/* Buttons */}
//       <TouchableOpacity onPress={logout} style={styles.logoutButton}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>

//       <TouchableOpacity 
//         onPress={() => navigation.navigate('Setting')} 
//         style={styles.settingsButton}
//       >
//         <Text style={styles.settingsText}>Go to Settings</Text>
//       </TouchableOpacity>

//       <TouchableOpacity 
//         onPress={() => navigation.navigate('AccountInformation')} 
//         style={styles.settingsButton}
//       >
//         <Text style={styles.settingsText}>Account Information</Text>
//       </TouchableOpacity>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F4F6F8',
//     paddingHorizontal: 20,
//   },
//   profileCard: {
//     backgroundColor: '#FFF',
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 3,
//     width: '100%',
//     marginTop: 30, // Overlapping effect
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   cardContent: {
//     gap: 10, // Spaces between items
//   },
//   info: {
//     fontSize: 16,
//     color: '#555',
//     marginVertical: 4,
//   },
//   logoutButton: {
//     backgroundColor: '#FF4D4F',
//     paddingVertical: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   logoutText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   settingsButton: {
//     backgroundColor: '#40A9FF',
//     paddingVertical: 12,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   settingsText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default ProfilePage;





import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { title: 'Account Information', route: 'AccountInformation' },
  { title: 'Add Card', route: 'CardCollection' },
  { title: 'DocumentVerification', route: 'DocumentVerification' },
  {title:"UploadDocument", route:"UploadDocument"},
  { title: 'Order History', route: 'OrderHistory' },
  { title: 'CustomerChatScreen', route: 'CustomerChatScreen' },
  // {title:"Add Bank Account", route:"AddBankAccount"},
  // {title:"RiderChatScreen", route:"RiderChatScreen"}
  {title:"order", route:"order"},


];

const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => logout() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.leftContent}>
                <Image
                  source={require('../assets/icons8-user-96.png')}
                  style={styles.icon}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.menuItemContent}>
            <View style={styles.leftContent}>
              <Image
                source={require('../assets/icons8-user-96.png')}
                style={styles.icon}
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    padding: 20,
    color: '#000000',
  },
  menuItem: {
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#0066FF',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
  },
  chevron: {
    fontSize: 24,
    color: '#0066FF',
  },
  logoutButton: {
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
  },
});

export default ProfilePage;
