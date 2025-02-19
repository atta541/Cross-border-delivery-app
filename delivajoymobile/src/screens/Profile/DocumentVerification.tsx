// import React, { useState, useEffect, useContext } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from 'react-native';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from '../../context/AuthContext'; // Ensure AuthContext is correctly imported

// const DocumentVerification = () => {
//   const { userToken } = useContext(AuthContext); // Access user token from context
//   const [accountId, setAccountId] = useState('');
//   const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

//   useEffect(() => {
//     const fetchAccountId = async () => {
//       if (!userToken) return;

//       try {
//         const response = await fetch('http://192.168.1.11:3001/users/me', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${userToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setAccountId(data.stripeCustomerId); // Assume 'accountId' is returned from the API
//         } else {
//           Alert.alert('Error', data.message || 'Something went wrong');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Unable to fetch account ID. Please try again later.');
//       }
//     };

//     fetchAccountId(); // Fetch account ID when the component mounts or userToken changes
//   }, [userToken]);

//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.allFiles],
//       });

//       setSelectedFile(result);
//       Alert.alert('File Selected', `You selected ${result.name}`);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Cancelled', 'File selection was cancelled.');
//       } else {
//         Alert.alert('Error', 'An error occurred while picking the document.');
//         console.error(err);
//       }
//     }
//   };

//   const uploadDocument = async () => {
//     if (!accountId || !selectedFile) {
//       Alert.alert('Error', 'Please provide both Account ID and a document to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('account_id', accountId);
//     formData.append('file', {
//       uri: selectedFile.uri,
//       name: selectedFile.name,
//       type: selectedFile.type || 'application/octet-stream',
//     });

//     try {
//       const response = await fetch('http://192.168.1.11:3001/verification/upload-verification-document', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', `Document uploaded successfully: ${JSON.stringify(result)}`);
//       } else {
//         Alert.alert('Error', result.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An unexpected error occurred.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Documentss Verification</Text>

//       {/* Removed the input field displaying the accountId */}
      
//       <TouchableOpacity style={styles.button} onPress={pickDocument}>
//         <Icon name="attach-file" size={20} color="#fff" />
//         <Text style={styles.buttonText}>Pick a Document </Text>
//       </TouchableOpacity>
//       {selectedFile && (
//         <Text style={styles.fileName}>
//           <Icon name="description" size={16} color="#333" /> {selectedFile.name}
//         </Text>
//       )}
//       <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
//         <Text style={styles.uploadButtonText}>Uploadd Document</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DocumentVerification;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   fileName: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 15,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   uploadButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });








// import React, { useState, useEffect, useContext } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   TextInput,
//   Alert,
// } from 'react-native';
// import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { AuthContext } from '../../context/AuthContext'; // Ensure AuthContext is correctly imported

// const DocumentVerification = () => {
//   const { userToken } = useContext(AuthContext); // Access user token from context
//   const [accountId, setAccountId] = useState('');
//   const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

//   useEffect(() => {
//     const fetchAccountId = async () => {
//       if (!userToken) return;

//       try {
//         const response = await fetch('http://192.168.1.6:3001/users/me', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${userToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setAccountId(data.stripeCustomerId); // Assume 'accountId' is returned from the API
//         } else {
//           Alert.alert('Error', data.message || 'Something went wrong');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Unable to fetch account ID. Please try again later.');
//       }
//     };

//     fetchAccountId(); // Fetch account ID when the component mounts or userToken changes
//   }, [userToken]);

//   const pickDocument = async () => {
//     try {
//       const result = await DocumentPicker.pickSingle({
//         type: [DocumentPicker.types.allFiles],
//       });

//       setSelectedFile(result);
//       Alert.alert('File Selected', `You selected ${result.name}`);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         Alert.alert('Cancelled', 'File selection was cancelled.');
//       } else {
//         Alert.alert('Error', 'An error occurred while picking the document.');
//         console.error(err);
//       }
//     }
//   };

//   const uploadDocument = async () => {
//     if (!accountId || !selectedFile) {
//       Alert.alert('Error', 'Please provide both Account ID and a document to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('account_id', accountId);
//     formData.append('file', {
//       uri: selectedFile.uri,
//       name: selectedFile.name,
//       type: selectedFile.type || 'application/octet-stream',
//     });

//     try {
//       const response = await fetch('http://192.168.1.6:3001/verification/upload-verification-document', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//       });

//       const result = await response.json();
//       if (response.ok) {
//         Alert.alert('Success', `Document uploaded successfully: ${JSON.stringify(result)}`);
//       } else {
//         Alert.alert('Error', result.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'An unexpected error occurred.');
//       console.error(error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Document Verification</Text>

//       {/* Removed the input field displaying the accountId */}
      
//       <TouchableOpacity style={styles.button} onPress={pickDocument}>
//         <Icon name="attach-file" size={20} color="#fff" />
//         <Text style={styles.buttonText}>Pick a Document</Text>
//       </TouchableOpacity>
//       {selectedFile && (
//         <Text style={styles.fileName}>
//           <Icon name="description" size={16} color="#333" /> {selectedFile.name}
//         </Text>
//       )}
//       <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
//         <Text style={styles.uploadButtonText}>Uploadd Document</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default DocumentVerification;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#007BFF',
//     paddingVertical: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     marginLeft: 10,
//   },
//   fileName: {
//     fontSize: 14,
//     color: '#555',
//     marginBottom: 15,
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   uploadButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });










// import React, { useState } from 'react';
// import { View, Button, ActivityIndicator, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';

// const DocumentVerification = () => {
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [htmlContent, setHtmlContent] = useState<string | null>(null);

//   const startVerification = async () => {
//     setIsVerifying(true);
//     try {
//       const response = await fetch('http://192.168.1.6:3001/verification/identity-verification', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!response.ok) {
//         throw new Error(`Server error: ${response.status}`);
//       }

//       const { clientSecret } = await response.json();

//       if (!clientSecret) {
//         throw new Error('Missing client secret in the server response');
//       }

//       const generatedHtml = `
//         <!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="UTF-8" />
//             <title>Identity Verification</title>
//             <script src="https://js.stripe.com/v3/"></script>
//             <style>
//               body {
//                 font-family: Arial, sans-serif;
//                 display: flex;
//                 justify-content: center;
//                 align-items: center;
//                 height: 100vh;
//                 margin: 0;
//               }
//               button {
//                 padding: 10px 20px;
//                 font-size: 16px;
//                 background-color: #6772e5;
//                 color: white;
//                 border: none;
//                 border-radius: 5px;
//                 cursor: pointer;
//               }
//               button:hover {
//                 background-color: #5469d4;
//               }
//             </style>
//           </head>
//           <body>
//             <button id="verify-btn">Start Verification</button>
//             <script>

//               console.log('Initializing Stripe...');
//               const stripe = Stripe('pk_test_eq21gKYPVUHFaaiOsj0h0q0i'); // Replace with your actual public key

//               document.getElementById('verify-btn').addEventListener('click', async () => {
//                 console.log('Verification button clicked');
//                 try {
//                   const { error } = await stripe.verifyIdentity('${clientSecret}');
//                   if (error) {
//                     console.error('Verification Failed:', error.message);
//                     alert('Verification Failed: ' + error.message);
//                     window.ReactNativeWebView.postMessage('verification-failure');
//                   } else {
//                     console.log('Verification Successful');
//                     alert('Verification Successful!');
//                     window.ReactNativeWebView.postMessage('verification-success');
//                   }
//                 } catch (err) {
//                   console.error('Error during verification:', err);
//                   alert('An unexpected error occurred: ' + err.message);
//                   window.ReactNativeWebView.postMessage('verification-failure');
//                 }
//               });
//             </script>
//           </body>
//         </html>
//       `;

//       setHtmlContent(generatedHtml);
//     } catch (error) {
//       console.error('Error fetching client secret:', error);
//       Alert.alert('Error', 'Failed to start verification. Please try again.');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {isVerifying ? (
//         <ActivityIndicator size="large" />
//       ) : htmlContent ? (
//         <WebView
//           originWhitelist={['*']}
//           source={{ html: htmlContent }}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//           onMessage={(event) => {
//             const message = event.nativeEvent.data;
//             if (message === 'verification-success') {
//               Alert.alert('Verification Successful');
//               setHtmlContent(null);
//             } else if (message === 'verification-failure') {
//               Alert.alert('Verification Failed');
//               setHtmlContent(null);
//             }
//           }}
//           onError={(syntheticEvent) => {
//             console.error('WebView error:', syntheticEvent.nativeEvent);
//             Alert.alert('Error', 'Failed to load the verification page.');
//           }}
//         />
//       ) : (
//         <Button title="Start sssVerification" onPress={startVerification} />
//       )}
//     </View>
//   );
// };

// export default DocumentVerification;




// import React, { useState } from 'react';
// import { View, Button, ActivityIndicator, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useStripeIdentity } from "@stripe/stripe-identity-react-native";


// const DocumentVerification = () => {
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationUrl, setVerificationUrl] = useState<string | null>(null);

//   const startVerification = async () => {
//     setIsVerifying(true);

//     // Make a request to your backend to create a verification session
//     try {
//       const response = await fetch('http://192.168.1.6:3001/verification/identity-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}),
//       });

//       const { clientSecret } = await response.json();

//       // Generate the Stripe Identity verification URL
//       const verificationUrl = `https://identity.stripe.com/verify?client_secret=${clientSecret}`;

//       console.log('Generated verification URL:', verificationUrl); // Log to check URL validity
//       setVerificationUrl(verificationUrl);
//     } catch (error) {
//       console.error('Error creating verification session:', error);
//       setIsVerifying(false);
//     }
//   };

//   // Function to safely log error objects (removes circular references)
//   const logError = (error: any) => {
//     let errorObject: any = error;
//     try {
//       errorObject = JSON.parse(JSON.stringify(error)); // Try to stringify the error safely
//     } catch (e) {
//       console.error("Error logging:", e); // If there’s an issue stringifying, log it separately
//     }
//     console.error('WebView loading error:', errorObject);
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {isVerifying && !verificationUrl ? (
//         <ActivityIndicator size="large" />
//       ) : (
//         <>
//           <Button title="Start Verification" onPress={startVerification} />
//           {verificationUrl && (
//             <WebView
//               source={{ uri: verificationUrl }}
//               style={{ marginTop: 20 }}
//               javaScriptEnabled={true}  // Ensure JavaScript is enabled
//               domStorageEnabled={true}  // Enable DOM storage
//               mixedContentMode="always"  // Allow non-HTTPS content if using HTTP
//               onNavigationStateChange={(event) => {
//                 if (event.url.includes('verification-success')) {
//                   // Handle successful verification here
//                   Alert.alert('Verification Successful');
//                 } else if (event.url.includes('verification-failure')) {
//                   // Handle failure here
//                   Alert.alert('Verification Failed');
//                 }
//               }}
//               onError={(error) => {
//                 logError(error); // Log error using the safe log function
//                 Alert.alert('Error loading verification page');
//               }}
//               onHttpError={(syntheticEvent) => {
//                 const { nativeEvent } = syntheticEvent;
//                 logError(nativeEvent); // Log HTTP error details
//                 Alert.alert('HTTP Error loading verification page');
//               }}
//             />
//           )}
//         </>
//       )}
//     </View>
//   );
// };


// export default DocumentVerification;











// import React, { useCallback, useState } from 'react';
// import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
// import { useStripeIdentity } from '@stripe/stripe-identity-react-native';

// const logo = 'https://tse4.mm.bing.net/th?id=OIP.NU9zscMHAn83CpLA9fDjrgHaHa&pid=Api&P=0&h=220';

// const DocumentVerification = () => {
//   const [status, setStatus] = useState(''); // To track verification status
//   const [loading, setLoading] = useState(false);

//   // Function to fetch session data
//   const fetchVerificationSessionParams = async () => {
//     try {
//       const response = await fetch('http://192.168.1.5:3001/verification/identity-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch session data');
//       const data = await response.json();
//       console.log('Verification session data:', data);
//       return data;
//     } catch (e) {
//       console.error('Error fetching session:', e);
//       throw e;  // Ensure this error is properly handled
//     }
//   };

//   // Function to fetch options for the Identity verification
//   // const fetchOptions = async () => {
//   //   try {
//   //     const response = await fetchVerificationSessionParams();
//   //     if (!response.clientSecret || !response.verificationId || !response.ephemeralKeySecret) {
//   //       throw new Error('Missing necessary session data');
//   //     }
//   //     return {
//   //       sessionId: response.clientSecret,
//   //       ephemeralKeySecret: response.ephemeralKeySecret,  // Ensure this is provided
//   //       brandLogo: { uri: logo },
//   //     };
//   //   } catch (e) {
//   //     console.error('Error fetching options:', e);
//   //     throw e;  // Ensure errors are thrown back to be handled properly
//   //   }
//   // };



//   const fetchOptions = async () => {
//     try {
//       const response = await fetchVerificationSessionParams();
//       if (!response.clientSecret || !response.verificationId || !response.ephemeralKeySecret) {
//         throw new Error('Missing necessary session data');
//       }
//       return {
//         sessionId: response.clientSecret,
//         ephemeralKeySecret: response.ephemeralKeySecret,
//         brandLogo: {
//           uri: logo,
//           height: 64,
//           width: 64,
//           scale: 1,
//         },
//       };
//     } catch (e) {
//       console.error('Error fetching options:', e);
//       throw e;
//     }
//   };
  
//   const { status: stripeStatus, present, loading: stripeLoading } = useStripeIdentity(fetchOptions);

//   // Handle button press
//   const handleVerifyPress = useCallback(() => {
//     setLoading(true);
//     try {
//       present()
//         .then(() => {
//           setStatus('Verification complete!');
//         })
//         .catch((error) => {
//           console.error('Error during verification:', error);
//           Alert.alert('Error', error.message || 'Something went wrong during verification');
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       console.error('Error in handleVerifyPress:', error);
//       setLoading(false);
//       Alert.alert('Error', 'An unexpected error occurred.');
//     }
//   }, [present]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify your identity atta</Text>
//       {/* Image using the external URL */}
//       <Image source={{ uri: logo }} style={styles.logo} />
//       <Button
//         title="Verify"
//         disabled={stripeLoading || loading}
//         onPress={handleVerifyPress}
//       />
//       <Text style={styles.status}>Status: {stripeStatus || status}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   status: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
//   logo: {
//     width: 64,
//     height: 64,
//     marginBottom: 20,
//   },
// });

// export default DocumentVerification;


// import React, { useCallback, useState } from 'react';
// import { StyleSheet, Text, View, Button, Alert, Image, Linking } from 'react-native';

// const logo = 'https://tse4.mm.bing.net/th?id=OIP.NU9zscMHAn83CpLA9fDjrgHaHa&pid=Api&P=0&h=220';

// const DocumentVerification = () => {
//   const [status, setStatus] = useState(''); // To track verification status
//   const [loading, setLoading] = useState(false);

//   // Function to fetch session data
//   const fetchVerificationSessionParams = async () => {
//     try {
//       const response = await fetch('http://192.168.1.5:3001/verification/identity-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch session data');
//       const data = await response.json();
//       console.log('Verification session data:', data);
//       return data;
//     } catch (e) {
//       console.error('Error fetching session:', e);
//       throw e; // Ensure this error is properly handled
//     }
//   };

//   // Updated handleVerifyPress function
//   const handleVerifyPress = useCallback(async () => {
//     setLoading(true);
//     try {
//       const sessionData = await fetchVerificationSessionParams();
//       if (sessionData.verificationUrl) {
//         Linking.openURL(sessionData.verificationUrl); // Opens the URL in a browser
//         setStatus('Redirecting to verification...');
//       } else {
//         throw new Error('Verification URL is missing');
//       }
//     } catch (error) {
//       console.error('Error in handleVerifyPress:', error);
//       Alert.alert('Error', error.message || 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify your identity attta</Text>
//       {/* Image using the external URL */}
//       <Image source={{ uri: logo }} style={styles.logo} />
//       <Button
//         title="Verify"
//         disabled={loading}
//         onPress={handleVerifyPress}
//       />
//       <Text style={styles.status}>Status: {status}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   status: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
//   logo: {
//     width: 64,
//     height: 64,
//     marginBottom: 20,
//   },
// });

// export default DocumentVerification;



// import React, { useCallback, useState } from 'react';
// import { StyleSheet, Text, View, Button, Alert, Image, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';


// const logo = 'https://tse4.mm.bing.net/th?id=OIP.NU9zscMHAn83CpLA9fDjrgHaHa&pid=Api&P=0&h=220';

// const DocumentVerification = () => {
//   const [status, setStatus] = useState(''); // To track verification status
//   const [loading, setLoading] = useState(false);
//   const [verificationUrl, setVerificationUrl] = useState(null); // Holds the URL to load in WebView

//   // Function to fetch session data
//   const fetchVerificationSessionParams = async () => {
//     try {
//       const response = await fetch('http://192.168.1.5:3001/verification/identity-verification', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) throw new Error('Failed to fetch session data');
//       const data = await response.json();
//       console.log('Verification session data:', data);
//       return data;
//     } catch (e) {
//       console.error('Error fetching session:', e);
//       throw e; // Ensure this error is properly handled
//     }
//   };

//   // Updated handleVerifyPress function
//   const handleVerifyPress = useCallback(async () => {
//     setLoading(true);
//     try {
//       const sessionData = await fetchVerificationSessionParams();
//       if (sessionData.verificationUrl) {
//         setVerificationUrl(sessionData.verificationUrl); // Set the URL for WebView
//         setStatus('Redirecting to verification...');
//       } else {
//         throw new Error('Verification URL is missing');
//       }
//     } catch (error) {
//       console.error('Error in handleVerifyPress:', error);
//       Alert.alert('Error', (error as any).message || 'Something went wrong.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Render the WebView if a URL is set
//   if (verificationUrl) {
//     return (
//       <WebView
//         source={{ uri: verificationUrl }}
//         style={{ flex: 1 }}
//         startInLoadingState={true}
//         renderLoading={() => <ActivityIndicator size="large" color="blue" />}
//       />
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify your identity</Text>
//       <Image source={{ uri: logo }} style={styles.logo} />
//       <Button
//         title="Verify"
//         disabled={loading}
//         onPress={handleVerifyPress}
//       />
//       <Text style={styles.status}>Status: {status}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   status: {
//     marginTop: 20,
//     fontSize: 16,
//     color: 'gray',
//   },
//   logo: {
//     width: 64,
//     height: 64,
//     marginBottom: 20,
//   },
// });

// export default DocumentVerification;



import React, { useState, useCallback } from 'react';
import {
  View,
  Button,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useStripeIdentity } from '@stripe/stripe-identity-react-native';
import {BASE_URL} from '@env';



const DocumentVerification = () => {
  const [statusMessage, setStatusMessage] = useState('');

  // Options provider for the verification session
  const fetchOptionsProvider = async () => {
    try {
              const response = await fetch(`${BASE_URL}/verification/identity-verification`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch verification session data');
      }

      const { verificationId, ephemeralKeySecret } = await response.json();
      return {
        sessionId: verificationId,
        ephemeralKeySecret,
        brandLogo: Image.resolveAssetSource(require('../../assets/apple-icon.png')), // Using require
      };
    } catch (error) {
      console.error('Error fetching verification session:', error);
      throw error;
    }
  };

  // Use Stripe Identity hook
  const { present, status, loading, error } = useStripeIdentity(fetchOptionsProvider);

  const handleVerify = useCallback(async () => {
    try {
      await present();
      setStatusMessage('Verification completed successfully!');
    } catch (err) {
      console.error('Error during verification:', err);
      setStatusMessage('Verification failed or was canceled.');
    }
  }, [present]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/apple-icon.png')} // Using require
        style={styles.logo}
      />
      <Text style={styles.title}>Stripe Identity Verification</Text>
      <Button
        title={loading ? 'Loading...' : 'Start Verification'}
        onPress={handleVerify}
        disabled={loading}
      />
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      <Text style={styles.status}>Status: {status || 'Not Started'}</Text>
      <Text style={styles.message}>{statusMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  status: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  message: {
    marginTop: 10,
    fontSize: 14,
  },
});

export default DocumentVerification;
