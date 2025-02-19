// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, FlatList } from 'react-native';

// interface Message {
//   _id: string;
//   text: string;
//   user: { _id: string; name: string };
//   createdAt: string;
// }

// const Admin = () => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     // Fetch messages from the backend using fetch
//     const fetchMessages = async () => {
//       try {
//         const response = await fetch('http://192.168.1.5:3001/messages'); // Replace with your backend URL
//         if (!response.ok) {
//           throw new Error('Failed to fetch messages');
//         }
//         const data = await response.json();
//         setMessages(data);
//       } catch (error) {
//         console.error('Error fetching messages', error);
//       }
//     };

//     fetchMessages();
//   }, []);

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user._id === '1' ? styles.userMessage : styles.riderMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//       <Text style={styles.timestamp}>{new Date(item.createdAt).toLocaleString()}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Admin Messages</Text>
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         inverted // Optional: shows the latest message at the bottom
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   messageContainer: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: '80%',
//   },
//   userMessage: {
//     backgroundColor: '#DCF8C6', // Color for customer (user) messages
//     alignSelf: 'flex-end',
//   },
//   riderMessage: {
//     backgroundColor: '#EAEAEA', // Color for rider messages
//     alignSelf: 'flex-start',
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#000',
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#888',
//     marginTop: 5,
//   },
// });

// export default Admin;








// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import io from 'socket.io-client';

// const socket = io('http://192.168.0.100:3001'); // Replace with your backend URL

// interface Message {
//   _id: string;
//   text: string;
//   user: { _id: string; name: string };
//   createdAt: Date;
// }

// const AdminChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     // Listen for new messages
//     socket.on('receiveMessage', (message: Message) => {
//       setMessages((prevMessages) => [message, ...prevMessages]);
//     });

//     // Listen for typing events
//     socket.on('typing', (data: { isTyping: boolean; user: string }) => {
//       if (data.user !== 'Admin') {
//         setIsTyping(data.isTyping);
//       }
//     });

//     return () => {
//       socket.off('receiveMessage');
//       socket.off('typing');
//     };
//   }, []);

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         text: newMessage,
//         user: { _id: '2', name: 'Admin' },
//         createdAt: new Date(),
//       };

//       socket.emit('sendMessage', message);
//       setMessages((prevMessages) => [
//         { ...message, _id: Math.random().toString(36).substring(7) },
//         ...prevMessages,
//       ]);
//       setNewMessage('');
//     }
//   };

//   const handleTyping = (text: string) => {
//     setNewMessage(text);
//     socket.emit('typing', { isTyping: text.length > 0, user: 'Admin' });
//   };

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user._id === '2' ? styles.adminMessage : styles.userMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item._id}
//         inverted
//         style={styles.messageList}
//       />

//       {isTyping && <Text style={styles.typingIndicator}>Customer is typing...</Text>}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={handleTyping}
//           placeholder="Type your message..."
//         />
//         <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', paddingTop: 10 },
//   messageList: { flex: 1, paddingHorizontal: 10 },
//   messageContainer: { marginBottom: 10, padding: 10, borderRadius: 10, maxWidth: '80%' },
//   adminMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
//   userMessage: { backgroundColor: '#EAEAEA', alignSelf: 'flex-start' },
//   messageText: { fontSize: 16, color: '#000' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
//   input: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 10 },
//   sendButton: { backgroundColor: '#0078FF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
//   sendButtonText: { color: '#fff', fontWeight: 'bold' },
//   typingIndicator: { textAlign: 'center', fontSize: 14, color: '#666', marginVertical: 5 },
// });

// export default AdminChatScreen;





// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { getDatabase, ref, push, onValue, set } from 'firebase/database';
// import { database } from '../../../firebaseConfig';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string };
//   createdAt: string;
// }

// const AdminChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   const adminUser = { id: 'admin', name: 'Admin' };

//   // Load messages from Firebase Realtime Database
//   useEffect(() => {
//     const dbRef = ref(database, 'messages/');
//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messagesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         // Sort messages by creation time in descending order
//         setMessages(messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const message = {
//         text: newMessage,
//         user: adminUser,
//         createdAt: new Date().toISOString(),
//       };

//       // Push the new message to Firebase
//       const dbRef = ref(database, 'messages/');
//       await push(dbRef, message);

//       setNewMessage('');
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user.id === adminUser.id ? styles.adminMessage : styles.userMessage,
//       ]}
//     >
//       <Text style={styles.messageText}>{item.text}</Text>
//     </View>
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <FlatList
//         data={messages}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         inverted
//         style={styles.messageList}
//       />

//       {isTyping && <Text style={styles.typingIndicator}>User is typing...</Text>}

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type your message..."
//         />
//         <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
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
//     paddingTop: 10,
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
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',
//     backgroundColor: '#fff',
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
//   typingIndicator: {
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#666',
//     marginVertical: 5,
//   },
// });

// export default AdminChatScreen;



import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { database } from '../../../../firebaseConfig';

interface Message {
  id: string;
  text: string;
  user: { id: string; name: string };
  createdAt: string;
}

const AdminChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const adminUser = { id: 'admin', name: 'Admin' };

  // Load messages from Firebase
  useEffect(() => {
    const dbRef = ref(database, 'messages/');
    const unsubscribe = onValue(dbRef, (snapshot) => {
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
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        user: adminUser,
        createdAt: new Date().toISOString(),
      };

      const dbRef = ref(database, 'messages/');
      await push(dbRef, message);

      setNewMessage('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.user.id === adminUser.id ? styles.adminMessage : styles.userMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.userName}>{item.user.name}</Text>
    </View>
  );

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
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
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
  adminMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  userMessage: {
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
    marginTop: 2,
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

export default AdminChatScreen;
