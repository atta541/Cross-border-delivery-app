import 'react-native-reanimated';
import React, { useContext } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import RiderAppNavigator from './src/screens/Rider/RiderAppNavigator'; // Import the rider-specific navigator
import LoginPage from './src/screens/LoginPage';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SignUpScreen from './src/screens/SignUpPage';
import RiderHome from './src/screens/Rider/Tabs/Home/Home'; // Import the rider-specific screen
import { createStackNavigator } from '@react-navigation/stack';
import {BasketProvider} from './src/components/Basket/BasketContext'; // Import the BasketProvider


const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <BasketProvider>
        <AppContent />
      </BasketProvider>
    </AuthProvider>
  );
};

const AppContent = () => {
  const { userToken, userRole, loading } = useContext(AuthContext);

  if (loading) {
    // Show a loading screen while checking token
    return <Text>Loading...</Text>;
  }

  if (!userToken || !userRole) {
    // Render login/signup screens if the user is not authenticated
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // Conditionally render screens based on the userRole
  return userRole === 'rider' ? (
    <RiderAppNavigator />
  ) : (
    <AppNavigator /> // Render the full app navigation for clients
  );
};

export default App;
