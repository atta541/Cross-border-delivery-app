import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Tabs/Home/Home';
import SearchPage from '../SearchPage';
import ProductsPage from '../ProductsPage';
import Profile from './Tabs/Profile/Profile';
import CardCollection from '../CardCollection';
import { Image, Text, View } from 'react-native';
import AccountInformation from '../Profile/AccountInformation';
import OrderHistory from '../Profile/OrderHistory';
// import FAQ from '../screens/Profile/ChatScreen';
import AddCardScreen from '../Profile/AddCardScreen';
import AddBankAccount from './Tabs/Profile/AddBankAccount';
import DocumentVerification from '../Profile/DocumentVerification';
// import ChatScreen from '../screens/Profile/CustomerChatScreen';
// import admin from '../screens/Profile/RiderChatScreen';
import UploadDocument from '../Profile/UploadDocument';
import RiderChatScreen from './Tabs/Profile/RiderChatScreen';
import Order from './Tabs/Profile/Orders/Order';
import ActiveOrders from './Tabs/Profile/Orders/ActiveOrders';




const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ActiveOrders" component={ActiveOrders} />

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
            source={require('../../assets/icons8-back-100.png')} 
            style={{ width: 24, height: 24, tintColor: '#0066FF',backgroundColor:"#fffffd" }} 
          />
        ),
      }}
    >
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="AccountInformation" component={AccountInformation} options={{ headerShown: true }} />
      {/* <Stack.Screen name="CardCollection" component={CardCollection} /> */}
      <Stack.Screen name="AddBankAccount" component={AddBankAccount} />
      <Stack.Screen name="DocumentVerification" component={DocumentVerification} />
      <Stack.Screen name="UploadDocument" component={UploadDocument} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      {/* <Stack.Screen name="CustomerSupport" component={CustomerSupport}  /> */}
      {/* <Stack.Screen name="AddressBook" component={AddressBook} /> */}
      <Stack.Screen name="RiderChatScreen" component={RiderChatScreen} />
      <Stack.Screen name="Orders" component={Order} options={{ headerShown: true }} />





    </Stack.Navigator>
  );
};







const RiderAppNavigator = () => {
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
                <Image source={require('../../assets/icons8-home-104.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 2 }}>Home</Text>}
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
                <Image source={require('../../assets/icons8-user-96.png')} style={{ width: 24, height: 24, tintColor: focused ? '#964fd4' : 'gray' }} />
                {focused && <Text style={{ color: '#964fd4', marginLeft: 2 }}>Account</Text>}
              </View>
            ),
          }}
        />






      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RiderAppNavigator;
