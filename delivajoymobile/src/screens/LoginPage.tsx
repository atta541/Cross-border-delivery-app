// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';


// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);


// const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password.');
//       return;
//     }
  
//     try {
//       setLoading(true);
//       // Use your machine's IP address instead of localhost
//       const response = await fetch('http://192.168.1.10:3000/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
        
//         Alert.alert('Login Successful', 'Token: ' + data.token);
//         // Save the token securely, e.g., AsyncStorage or SecureStore
//         // Navigate to the next screen
//       } else {
//         Alert.alert('Login Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };
  


// return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Illustration */}
//         <Image
//           source={{
//             uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
//           }}
//           style={styles.illustration}
//           resizeMode="contain"
//         />

//         {/* Login Text */}
//         <Text style={styles.title}>Lzogin</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/email-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/password-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.loginButtonText}>
//             {loading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Section */}
//         <Text style={styles.orText}>Or, login with...</Text>
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/google-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/facebook-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/apple-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>New to Delivajoy? </Text>
//           <TouchableOpacity>
//             <Text style={styles.registerLink}>Register</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   illustration: {
//     width: '150%',
//     height: 200,
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'left',
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 48,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginBottom: 20,
//   },
//   inputIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     color: 'white',
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: 16,
//   },
//   forgotText: {
//     color: '#2F80ED',
//     marginLeft: 10,
//   },
//   loginButton: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#2F80ED',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666666',
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   socialButton: {
//     width: 80,
//     height: 48,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   registerText: {
//     color: '#666666',
//   },
//   registerLink: {
//     color: '#2F80ED',
//   },
// });

// export default LoginPage;





// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { AuthContext } from '../context/AuthContext'; // Assuming you have this context created

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext); // Access the login function from AuthContext

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('http://192.168.1.3:3001/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert('Login Successful');
//         login(data.token); // Store the token and navigate
//       } else {
//         Alert.alert('Login Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>

//         {/* Illustration */}
//         <Image
//           source={{
//             uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
//           }}
//           style={styles.illustration}
//           resizeMode="contain"
//         />

//         {/* Login Title */}
//         <Text style={styles.title}>Login</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/email-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/password-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.loginButtonText}>
//             {loading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Section */}
//         <Text style={styles.orText}>Or, login with...</Text>
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/google-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/facebook-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/apple-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>New to Delivajoy? </Text>
//           <TouchableOpacity>
//             <Text style={styles.registerLink}>Register</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   illustration: {
//     width: '150%',
//     height: 200,
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'left',
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 48,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginBottom: 20,
//   },
//   inputIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     color: 'white',
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: 16,
//   },
//   forgotText: {
//     color: '#2F80ED',
//     marginLeft: 10,
//   },
//   loginButton: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#2F80ED',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666666',
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   socialButton: {
//     width: 80,
//     height: 48,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   registerText: {
//     color: '#666666',
//   },
//   registerLink: {
//     color: '#2F80ED',
//   },
// });

// export default LoginPage;





// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { AuthContext } from '../context/AuthContext'; // Assuming you have this context created

// const LoginPage = ({ navigation }: any) => { // Access navigation prop
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext); // Access the login function from AuthContext

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch('http://192.168.1.3:3001/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Alert.alert('Login Successful');
//         login(data.token); // Store the token and navigate
//       } else {
//         Alert.alert('Login Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Illustration */}
//         <Image
//           source={{
//             uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
//           }}
//           style={styles.illustration}
//           resizeMode="contain"
//         />

//         {/* Login Title */}
//         <Text style={styles.title}>Login</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/email-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/password-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.loginButtonText}>
//             {loading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Section */}
//         <Text style={styles.orText}>Or, login with...</Text>
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/google-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/facebook-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/apple-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>New to Delivajoy? </Text>
//           <TouchableOpacity > 
//             <Text style={styles.registerLink}>Register</Text>
//           </TouchableOpacity>
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   illustration: {
//     width: '150%',
//     height: 200,
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'left',
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 48,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginBottom: 20,
//   },
//   inputIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     color: 'white',
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: 16,
//   },
//   forgotText: {
//     color: '#2F80ED',
//     marginLeft: 10,
//   },
//   loginButton: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#2F80ED',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666666',
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   socialButton: {
//     width: 80,
//     height: 48,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   registerText: {
//     color: '#666666',
//   },
//   registerLink: {
//     color: '#2F80ED',
//   },
// });

// export default LoginPage;



// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { AuthContext } from '../context/AuthContext'; // Assuming you have this context created
// import {BASE_URL} from '@env';


// const LoginPage = ({ navigation }: any) => { // Access navigation prop
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext); // Access the login function from AuthContext

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login(data.token); // Store the token and navigate
//       } else {
//         Alert.alert('Login Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Illustration */}
//         <Image
//           source={{
//             uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
//           }}
//           style={styles.illustration}
//           resizeMode="contain"
//         />

//         {/* Login Title */}
//         <Text style={styles.title}>Login</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/email-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/password-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.loginButtonText}>
//             {loading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Section */}
//         <Text style={styles.orText}>Or, login with...</Text>
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/google-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/facebook-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/apple-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>New to Delivajoy? </Text>
//           <TouchableOpacity >
//             <Text style={styles.registerLink}>Register</Text>

//           </TouchableOpacity>
          
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   illustration: {
//     width: '150%',
//     height: 200,
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'left',
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 48,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginBottom: 20,
//   },
//   inputIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     color: 'white',
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: 16,
//   },
//   forgotText: {
//     color: '#2F80ED',
//     marginLeft: 10,
//   },
//   loginButton: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#2F80ED',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666666',
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   socialButton: {
//     width: 80,
//     height: 48,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   registerText: {
//     color: '#666666',
//   },
//   registerLink: {
//     color: '#2F80ED',
//   },
// });

// export default LoginPage;





// import React, { useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   Alert,
// } from 'react-native';
// import { AuthContext } from '../context/AuthContext'; // Assuming you have this context created
// import {BASE_URL} from '@env';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SignUpScreen from './SignUpPage'

// // const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const LoginPage = ({ navigation }: any) => { // Access navigation prop
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useContext(AuthContext); // Access the login function from AuthContext

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Validation Error', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log(BASE_URL);
//       const response = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login(data.token); // Store the token and navigate
//       } else {
//         Alert.alert('Login Failed', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to login. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         {/* Illustration */}
//         <Image
//           source={{
//             uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
//           }}
//           style={styles.illustration}
//           resizeMode="contain"
//         />

//         {/* Login Title */}
//         <Text style={styles.title}>Login</Text>

//         {/* Email Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/email-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email ID"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         </View>

//         {/* Password Input */}
//         <View style={styles.inputContainer}>
//           <Image
//             source={require('../assets/password-icon.png')}
//             style={styles.inputIcon}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />
//           <TouchableOpacity>
//             <Text style={styles.forgotText}>Forgot?</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Login Button */}
//         <TouchableOpacity
//           style={styles.loginButton}
//           onPress={handleLogin}
//           disabled={loading}
//         >
//           <Text style={styles.loginButtonText}>
//             {loading ? 'Logging In...' : 'Login'}
//           </Text>
//         </TouchableOpacity>

//         {/* Social Login Section */}
//         <Text style={styles.orText}>Or, login with...</Text>
//         <View style={styles.socialContainer}>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/google-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/facebook-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.socialButton}>
//             <Image
//               source={require('../assets/apple-icon.png')}
//               style={styles.socialIcon}
//             />
//           </TouchableOpacity>
//         </View>

//         {/* Register Link */}
//         <View style={styles.registerContainer}>
//           <Text style={styles.registerText}>New to Delivajoy? </Text>
//           <TouchableOpacity >

//            < Stack.Navigator>
//             <Text style={styles.registerLink}>Register</Text>
//             <Stack.Screen name="SignUp" component={SignUpScreen} />

//             </Stack.Navigator>
//           </TouchableOpacity>
          
//         </View>

//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 24,
//     alignItems: 'center',
//   },
//   illustration: {
//     width: '150%',
//     height: 200,
//     marginTop: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 30,
//     textAlign: 'left',
//     width: '100%',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 48,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E5E5',
//     marginBottom: 20,
//   },
//   inputIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//     color: 'white',
//   },
//   input: {
//     flex: 1,
//     height: '100%',
//     fontSize: 16,
//   },
//   forgotText: {
//     color: '#2F80ED',
//     marginLeft: 10,
//   },
//   loginButton: {
//     width: '100%',
//     height: 48,
//     backgroundColor: '#2F80ED',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#666666',
//     marginVertical: 20,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 10,
//   },
//   socialButton: {
//     width: 80,
//     height: 48,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: '#E5E5E5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   socialIcon: {
//     width: 24,
//     height: 24,
//   },
//   registerContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//   },
//   registerText: {
//     color: '#666666',
//   },
//   registerLink: {
//     color: '#2F80ED',
//   },
// });

// export default LoginPage;


import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { AuthContext } from '../context/AuthContext'; // Assuming you have this context created
import {BASE_URL} from '@env';

const LoginPage = ({ navigation }: any) => { // Access navigation prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext); // Access the login function from AuthContext

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      console.log(BASE_URL);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data to check role",data);

      if (response.ok) {
        login(data.token, data.role); // Store the token and navigate
      } else {
        Alert.alert('Login Failed', data.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Illustration */}
        <Image
          source={{
            uri: 'https://www.shutterstock.com/image-vector/registration-abstract-concept-vector-illustration-600nw-1856790145.jpg',
          }}
          style={styles.illustration}
          resizeMode="contain"
        />

        {/* Login Title */}
        <Text style={styles.title}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/email-icon.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email ID"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Image
            source={require('../assets/password-icon.png')}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging In...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Social Login Section */}
        <Text style={styles.orText}>Or, login with...</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/google-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/facebook-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require('../assets/apple-icon.png')}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>New to Delivajoy? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  illustration: {
    width: '150%',
    height: 200,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'left',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginBottom: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: 'white',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  forgotText: {
    color: '#2F80ED',
    marginLeft: 10,
  },
  loginButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2F80ED',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: '#666666',
    marginVertical: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  socialButton: {
    width: 80,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  registerText: {
    color: '#666666',
  },
  registerLink: {
    color: '#2F80ED',
  },
});

export default LoginPage;
