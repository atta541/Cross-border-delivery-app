import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../screens/HomePage';
import SearchPage from '../screens/SearchPage';
import ProductsPage from '../screens/ProductsPage';
import ProfilePage from '../screens/ProfilePage';
import CardCollection from '../screens/CardCollection';
import { Image, Text, View } from 'react-native';
import AccountInformation from '../screens/Profile/AccountInformation';
import OrderHistory from '../screens/Profile/OrderHistory';
// import FAQ from '../screens/Profile/ChatScreen';
import AddCardScreen from '../screens/Profile/AddCardScreen';
// import AddBankAccount from '../screens/Profile/AddBankAccount';
import DocumentVerification from '../screens/Profile/DocumentVerification';
import ChatScreen from '../screens/Profile/CustomerChatScreen';
import admin from '../screens/Rider/Tabs/Profile/RiderChatScreen';
import UploadDocument from '../screens/Profile/UploadDocument';
import RiderChatScreen from '../screens/Rider/Tabs/Profile/RiderChatScreen';
import CustomerChatScreen from '../screens/Profile/CustomerChatScreen';
import BasketScreen from '../components/Basket/BasketScreen';
import Order from '../screens/Profile/Order';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Details" component={ProductsPage} />
      <Stack.Screen name="BasketScreen" component={BasketScreen} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};

// 🔥 Stack Navigator for Explore Tab
const ExploreStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={SearchPage} />
      <Stack.Screen name="ProductDetails" component={ProductsPage} />
    </Stack.Navigator>
  );
};



const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: { backgroundColor: '#ffffff',

          elevation: 0, // Remove border/shadow on Android
          shadowOpacity: 0, // Remove border/shadow on iOS
          borderBottomWidth: 0, // Just in case, to remove any bottom border
         }, // Header background color
        headerTintColor: '#0066FF', // Color of back button and icons
        headerTitleStyle: { 
          color: '#0066FF', // Color of the header title text
          fontWeight: '300', // Optional: make the header text bold
        },
        headerBackImage: () => (
          <Image 
            source={require('../assets/icons8-back-100.png')} 
            style={{ width: 24, height: 24, tintColor: '#0066FF',backgroundColor:"#fffffd" }} 
          />
        ),
      }}
    >
      <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
      <Stack.Screen name="AccountInformation" component={AccountInformation} options={{ headerShown: true }} />
      <Stack.Screen name="CardCollection" component={CardCollection} />
      {/* <Stack.Screen name="AddBankAccount" component={AddBankAccount} /> */}
      <Stack.Screen name="DocumentVerification" component={DocumentVerification} />
      <Stack.Screen name="UploadDocument" component={UploadDocument} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="CustomerChatScreen" component={CustomerChatScreen} />
      <Stack.Screen name="RiderChatScreen" component={RiderChatScreen} />
      <Stack.Screen name="order" component={Order} />


    </Stack.Navigator>
  );
};




// 🔥 Stack Navigator for Manage Cards Tab
const CardStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CardCollection"
        component={CardCollection}
        options={{ headerShown: false }} // Hide header for CardCollection
      />
      <Stack.Screen
        name="AddCardScreen"
        component={AddCardScreen}
        options={{ headerShown: true }} // Show header for AddCardScreen
      />
    </Stack.Navigator>
  );
};


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#964fd4',
          tabBarInactiveTintColor: 'gray',
          tabBarActiveBackgroundColor: 'white',
          tabBarStyle: {
            height: 90,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          headerShown: false,
          tabBarLabel: () => null,
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#f5f1fb', width: 90, marginTop: 40, borderRadius: 50, padding: 10 }}>
                <Image source={require('../assets/icons8-home-104.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 2 }}>Home</Text>}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="ExploreTab"
          component={ExploreStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#f5f1fb', width: 90, marginTop: 40, borderRadius: 50, padding: 10 }}>
                <Image source={require('../assets/icons8-search-75.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 1 }}>Explore</Text>}
              </View>
            ),
          }}
        />



        <Tab.Screen
          name="ManageCardsTab"
          component={CardStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#f5f1fb', width: 90, marginTop: 40, borderRadius: 50, padding: 10 }}>
                <Image source={require('../assets/icons8-user-96.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 2 }}>Manage</Text>}
              </View>
            ),
          }}
        />



        <Tab.Screen
          name="ProfileTab"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: '#f5f1fb', width: 90, marginTop: 40, borderRadius: 50, padding: 10 }}>
                <Image source={require('../assets/icons8-user-96.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 2 }}>Account</Text>}
              </View>
            ),
          }}
        />






      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
