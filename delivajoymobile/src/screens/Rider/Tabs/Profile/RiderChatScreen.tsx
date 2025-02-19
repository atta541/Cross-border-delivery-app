// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { getDatabase, ref, push, onValue, update } from 'firebase/database';
// import { database } from '../../../../../firebaseConfig';
// import { AuthContext } from '../../../../context/AuthContext';
// import { BASE_URL } from '@env';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string };
//   createdAt: string;
//   read: boolean;
// }

// const RiderChatScreen = () => {
  
//   const {userToken} = useContext(AuthContext);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [userId, setUserId] = useState<string>(''); 
//   const [userName, setUserName] = useState<string>(''); 
//   const [userRole, setUserRole] = useState<string>(''); 
//   const [loading, setLoading] = useState<boolean>(true);

 
//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/me`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('Fetched user data:', data); // Debugging
//         setUserId(data.stripeCustomerId || ''); // Default to empty string if undefined
//         setUserName(`${data.first_name || ''} ${data.last_name || ''}`.trim());
//         setUserRole(data.role || '');
//       } else {
//         throw new Error(data.message || 'Failed to fetch user data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch user data.');
//       console.error('Fetch user data error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleTyping = (text: string) => {
//     setNewMessage(text);
//     setIsTyping(text.length > 0);
//   };

//   // Load messages from Firebase
//   useEffect(() => {
//     const dbRef = ref(database, 'messages/');
//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messagesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setMessages(messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const lastMessage = messages[0];
//       if (lastMessage.user.id !== userId && !lastMessage.read) {
//         const messageRef = ref(database, `messages/${lastMessage.id}`);
//         update(messageRef, { read: true }).catch((error) =>
//           console.error('Failed to update read status:', error)
//         );
//       }
//     }
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const message = {
//         text: newMessage.trim(),
//         user: { id: userId, name: userName, role: userRole },
//         createdAt: new Date().toISOString(),
//         read: false,
//       };
 
//       const dbRef = ref(database, 'messages/');
//       await push(dbRef, message);

//       setNewMessage('');
//       setIsTyping(false);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send message. Please try again.');
//       console.error('Message sending error:', error);
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => {
//     const messageStatus = item.read
//       ? 'Read'
//       : item.user.id === userId
//       ? 'Sent'
//       : 'Received';

//     return (
//       <View
//         style={[
//           styles.messageContainer,
//           item.user.id === userId ? styles.adminMessage : styles.userMessage,
//         ]}
//       >
//         <Text style={styles.messageText}>{item.text}</Text>
//         <Text style={styles.timeStamp}>
//           {new Date(item.createdAt).toLocaleTimeString()}
//         </Text>
//         <Text style={styles.userName}>{item.user.name}</Text>
//         <View style={styles.messageStatus}>
//           {messageStatus === 'Sent' && <Text>•</Text>}
//           {messageStatus === 'Received' && <Text>••</Text>}
//           {messageStatus === 'Read' && (
//             <Text style={styles.readReceipt}>✓✓</Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userToken]);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.messageList}
//       />
//       {isTyping && (
//         <Text style={styles.typingIndicator}>Customer is typing...</Text>
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={handleTyping}
//           placeholder="Type your message..."
//         />
//         <TouchableOpacity
//           onPress={handleSendMessage}
//           style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
//           disabled={!newMessage.trim()}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   messageContainer: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   adminMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   userMessage: {
//     backgroundColor: '#EAEAEA',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   userName: {
//     fontSize: 12,
//     color: '#555',
//     marginTop: 2,
//   },
//   timeStamp: {
//     fontSize: 10,
//     color: '#888',
//     marginTop: 2,
//   },
//   messageStatus: {
//     marginTop: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   readReceipt: {
//     fontSize: 14,
//     color: '#0078FF',
//   },
//   typingIndicator: {
//     fontSize: 12,
//     color: '#888',
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#0078FF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default RiderChatScreen;



// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { getDatabase, ref, push, onValue, update } from 'firebase/database';
// import { database } from '../../../../../firebaseConfig';
// import { AuthContext } from '../../../../context/AuthContext';
// import { BASE_URL } from '@env';
// import { useRoute } from '@react-navigation/native';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string };
//   createdAt: string;
//   read: boolean;
// }

// interface RiderChatScreenProps {
//   userId: string;  // Add userId as a prop
// }

  

//   const RiderChatScreen: React.FC = () => {
//     const route = useRoute();
//     const { userId } = route.params as { userId: string };
  
//     console.log("user id is in the riderscreen ok ", userId);




//   console.log("user id is the ",userId);
//   const { userToken } = useContext(AuthContext);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [userName, setUserName] = useState<string>(''); 
//   const [userRole, setUserRole] = useState<string>(''); 
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/me`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         console.log('Fetched user data:', data); // Debugging
//         setUserName(`${data.first_name || ''} ${data.last_name || ''}`.trim());
//         setUserRole(data.role || '');
//       } else {
//         throw new Error(data.message || 'Failed to fetch user data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch user data.');
//       console.error('Fetch user data error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleTyping = (text: string) => {
//     setNewMessage(text);
//     setIsTyping(text.length > 0);
//   };

//   // Load messages from Firebase
//   useEffect(() => {
//     const dbRef = ref(database, 'messages/');
//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messagesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setMessages(messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const lastMessage = messages[0];
//       if (lastMessage.user.id !== userId && !lastMessage.read) {
//         const messageRef = ref(database, `messages/${lastMessage.id}`);
//         update(messageRef, { read: true }).catch((error) =>
//           console.error('Failed to update read status:', error)
//         );
//       }
//     }
//   }, [messages, userId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const message = {
//         text: newMessage.trim(),
//         user: { id: userId, name: userName, role: userRole },
//         createdAt: new Date().toISOString(),
//         read: false,
//       };
 
//       const dbRef = ref(database, 'messages/');
//       await push(dbRef, message);

//       setNewMessage('');
//       setIsTyping(false);
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send message. Please try again.');
//       console.error('Message sending error:', error);
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => {
//     const messageStatus = item.read
//       ? 'Read'
//       : item.user.id === userId
//       ? 'Sent'
//       : 'Received';

//     return (
//       <View
//         style={[
//           styles.messageContainer,
//           item.user.id === userId ? styles.adminMessage : styles.userMessage,
//         ]}
//       >
//         <Text style={styles.messageText}>{item.text}</Text>
//         <Text style={styles.timeStamp}>
//           {new Date(item.createdAt).toLocaleTimeString()}
//         </Text>
//         <Text style={styles.userName}>{item.user.name}</Text>
//         <View style={styles.messageStatus}>
//           {messageStatus === 'Sent' && <Text>•</Text>}
//           {messageStatus === 'Received' && <Text>••</Text>}
//           {messageStatus === 'Read' && (
//             <Text style={styles.readReceipt}>✓✓</Text>
//           )}
//         </View>
//       </View>
//     );
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userToken]);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.messageList}
//       />
//       {isTyping && (
//         <Text style={styles.typingIndicator}>Customer is typing...</Text>
//       )}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={handleTyping}
//           placeholder="Type your message..."
//         />
//         <TouchableOpacity
//           onPress={handleSendMessage}
//           style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
//           disabled={!newMessage.trim()}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   messageContainer: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   adminMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   userMessage: {
//     backgroundColor: '#EAEAEA',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   userName: {
//     fontSize: 12,
//     color: '#555',
//     marginTop: 2,
//   },
//   timeStamp: {
//     fontSize: 10,
//     color: '#888',
//     marginTop: 2,
//   },
//   messageStatus: {
//     marginTop: 5,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   readReceipt: {
//     fontSize: 14,
//     color: '#0078FF',
//   },
//   typingIndicator: {
//     fontSize: 12,
//     color: '#888',
//     marginLeft: 10,
//     marginTop: 5,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#0078FF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default RiderChatScreen;



// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
// } from 'react-native';
// import { getDatabase, ref, push, onValue, update } from 'firebase/database';
// import { database } from '../../../../../firebaseConfig';
// import { AuthContext } from '../../../../context/AuthContext';
// import { BASE_URL } from '@env';
// import { useRoute } from '@react-navigation/native';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string };
//   createdAt: string;
//   read: boolean;
// }


//   const RiderChatScreen: React.FC = () => {
//     const route = useRoute();
//     const { userId, customerName  } = route.params as { userId: string; customerName: string };
  
//     console.log("customer name is :", customerName); 
  

//   const { userToken } = useContext(AuthContext);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [userName, setUserName] = useState<string>('');
//   const [riderId, setRiderId] = useState<string>('');
//   const [userRole, setUserRole] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);

//   // Create a unique conversation ID based on user and rider
//   const conversationId = `${userId}_${riderId}`;
//   const messagesRef = ref(database, `messages/${conversationId}/`);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/me`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log('Fetched user datswswxxxxa:', data._id);
//         setUserName(`${data.first_name || ''} ${data.last_name || ''}`.trim());
//         setUserRole(data.role || '');
//         setRiderId(data._id);
//       } else {
//         throw new Error(data.message || 'Failed to fetch user data');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch user data.');
//       console.error('Fetch user data error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, [userToken]);

//   useEffect(() => {
//     // Load messages for the specific conversation
//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messagesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setMessages(messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [conversationId]);

//   useEffect(() => {
//     if (messages.length > 0) {
//       const lastMessage = messages[0];
//       if (lastMessage.user.id !== userId && !lastMessage.read) {
//         const messageRef = ref(database, `messages/${conversationId}/${lastMessage.id}`);
//         update(messageRef, { read: true }).catch((error) =>
//           console.error('Failed to update read status:', error)
//         );
//       }
//     }
//   }, [messages, userId, conversationId]);

//   const handleSendMessage = async () => {
//     if (!newMessage.trim()) return;

//     try {
//       const message = {
//         text: newMessage.trim(),
//         user: { id: userId, name: userName, role: userRole },
//         createdAt: new Date().toISOString(),
//         read: false,
//       };

//       await push(messagesRef, message);

//       setNewMessage('');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to send message. Please try again.');
//       console.error('Message sending error:', error);
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => {
//     const isSentByUser = item.user.id === userId;
//     return (
//       <View
//         style={[
//           styles.messageContainer,
//           isSentByUser ? styles.sentMessage : styles.receivedMessage,
//         ]}
//       >
//         <Text style={styles.messageText}>{item.text}</Text>
//         <Text style={styles.userName}>{item.user.name}</Text>
//         <Text style={styles.timeStamp}>
//           {new Date(item.createdAt).toLocaleTimeString()}
//         </Text>
//         {item.read && <Text style={styles.readReceipt}>✓✓</Text>}
//       </View>
//     );
//   };

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         style={styles.messageList}
//       />
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type your message..."
//         />
//         <TouchableOpacity
//           onPress={handleSendMessage}
//           style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
//           disabled={!newMessage.trim()}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   messageList: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   messageContainer: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   sentMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   receivedMessage: {
//     backgroundColor: '#EAEAEA',
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   userName: {
//     fontSize: 12,
//     color: '#555',
//   },
//   timeStamp: {
//     fontSize: 10,
//     color: '#888',
//   },
//   readReceipt: {
//     fontSize: 14,
//     color: '#0078FF',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//   },
//   input: {
//     flex: 1,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     marginRight: 10,
//   },
//   sendButton: {
//     backgroundColor: '#0078FF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// }); 

// export default RiderChatScreen;




import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { getDatabase, ref, push, onValue, update } from 'firebase/database';
import { database } from '../../../../../firebaseConfig';
import { AuthContext } from '../../../../context/AuthContext';
import { BASE_URL } from '@env';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  user: { id: string; name: string };
  createdAt: string;
  read: boolean;
}

const RiderChatScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, customerName } = route.params as { userId: string; customerName: string };
  
  console.log("customer name is:", customerName);

  const { userToken } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState<string>('');
  const [riderId, setRiderId] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // Set the header title dynamically to the customerName
  useEffect(() => {
    navigation.setOptions({ title: customerName });
  }, [customerName, navigation]);

  // Create a unique conversation ID based on user and rider
  const conversationId = `${userId}_${riderId}`;
  const messagesRef = ref(database, `messages/${conversationId}/`);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Fetched user data:', data._id);
        setUserName(`${data.first_name || ''} ${data.last_name || ''}`.trim());
        setUserRole(data.role || '');
        setRiderId(data._id);
      } else {
        throw new Error(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to fetch user data.');
      console.error('Fetch user data error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userToken]);

  useEffect(() => {
    // Load messages for the specific conversation
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setMessages(messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [conversationId]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[0];
      if (lastMessage.user.id !== userId && !lastMessage.read) {
        const messageRef = ref(database, `messages/${conversationId}/${lastMessage.id}`);
        update(messageRef, { read: true }).catch((error) =>
          console.error('Failed to update read status:', error)
        );
      }
    }
  }, [messages, userId, conversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const message = {
        text: newMessage.trim(),
        user: { id: userId, name: userName, role: userRole },
        createdAt: new Date().toISOString(),
        read: false,
      };

      await push(messagesRef, message);

      setNewMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
      console.error('Message sending error:', error);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isSentByUser = item.user.id === userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isSentByUser ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.userName}>{item.user.name}</Text>
        <Text style={styles.timeStamp}>
          {new Date(item.createdAt).toLocaleTimeString()}
        </Text>
        {item.read && <Text style={styles.readReceipt}>✓✓</Text>}
      </View>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          style={[styles.sendButton, { opacity: newMessage.trim() ? 1 : 0.5 }]}
          disabled={!newMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  userName: {
    fontSize: 12,
    color: '#555',
  },
  timeStamp: {
    fontSize: 10,
    color: '#888',
  },
  readReceipt: {
    fontSize: 14,
    color: '#0078FF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#0078FF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RiderChatScreen;
