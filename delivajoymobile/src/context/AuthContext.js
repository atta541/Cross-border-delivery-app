import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store user role
  const [loading, setLoading] = useState(true);

  const login = async (token, role) => {
    if (!token || !role) {
      console.log('Invalid token or role:', { token, role });
      return;
    }

    try {
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userRole', role); // Store user role in AsyncStorage
      setUserToken(token);
      setUserRole(role); // Set role in state
      console.log('Token stored:', token);
      console.log('Role stored in auth context to use further:', role);
    } catch (error) {
      console.log('Error storing token or role:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userRole'); // Remove user role from AsyncStorage
      setUserToken(null);
      setUserRole(null); // Reset role in state
    } catch (error) {
      console.log('Error removing token or role:', error);
    }
  };

  const loadAuthData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const role = await AsyncStorage.getItem('userRole'); // Load user role from AsyncStorage
      if (token && role) {
        setUserToken(token);
        setUserRole(role); // Set role in state
        console.log('Role retrieved in auth context:', role);
      } else {
        console.log('No token or role found');
      }
    } catch (error) {
      console.log('Error loading token or role:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuthData();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};














// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userToken, setUserToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const login = async (token) => {
//     try {
//       await AsyncStorage.setItem('userToken', token);
//       setUserToken(token);
//       console.log(token)
//     } catch (error) {
//       console.log('Error storing token:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       setUserToken(null);
//     } catch (error) {
//       console.log('Error removing token:', error);
//     }
//   };

//   const loadToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token) {
//         setUserToken(token);
//       }
//     } catch (error) {
//       console.log('Error loading token:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userToken, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };









// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BASE_URL } from '@env';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userToken, setUserToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [userRole, setUserRole] = useState(null); // Add state to store user role

//   const login = async (token) => {
//     try {
//       // Store token in AsyncStorage
//       await AsyncStorage.setItem('userToken', token);
//       setUserToken(token);

//       // Fetch user data to get the role
//       const response = await fetch(`${BASE_URL}/users/me`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       // Assuming data.role is part of the response
//       if (data && data.role) {
//         setUserRole(data.role); // Set user role in the context
//       }

//       console.log('User role:', data.role);
//     } catch (error) {
//       console.log('Error during login:', error);
//     }
//   };

//   const logout = async () => {
//     try {
//       await AsyncStorage.removeItem('userToken');
//       setUserToken(null);
//       setUserRole(null); // Clear user role on logout
//     } catch (error) {
//       console.log('Error removing token:', error);
//     }
//   };

//   const loadToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (token) {
//         setUserToken(token);
//       }
//     } catch (error) {
//       console.log('Error loading token:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ userToken, userRole, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
