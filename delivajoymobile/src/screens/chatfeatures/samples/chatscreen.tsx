// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import io from 'socket.io-client';

// // Connect to your backend WebSocket server
// const socket = io('http://192.168.1.5:3001'); // Replace with your backend URL

// // Define a type for the message
// interface Message {
//   _id: string; // Ensure _id is required, MongoDB will automatically generate this
//   text: string;
//   user: { _id: string; name: string };
//   createdAt: Date;
// }

// const ChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     // Listen for new messages from the server
//     socket.on('receiveMessage', (message: Message) => {
//       setMessages((prevMessages) => [message, ...prevMessages]); // Prepend the new message
//     });

//     return () => {
//       socket.off('receiveMessage'); // Clean up the event listener on component unmount
//     };
//   }, []);



  

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       const message = {
//         text: newMessage,
//         user: { _id: '1', name: 'Customer' }, // Replace with actual user info
//         createdAt: new Date(),
//       };

//       // Emit the new message to the WebSocket server
//       socket.emit('sendMessage', message);

//       // Optionally, update local state to see the message immediately
//       setMessages((prevMessages) => [
//         { ...message, _id: Math.random().toString(36).substring(7) }, // This will be removed in production
//         ...prevMessages,
//       ]);
//       setNewMessage(''); // Clear the input field
//     }
//   };

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user._id === '1' ? styles.userMessage : styles.riderMessage,
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
//         inverted // Make sure the newest messages are at the bottom
//         style={styles.messageList}
//       />
      
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
// });

// export default ChatScreen;






// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import io from 'socket.io-client';

// const socket = io('http://192.168.1.5:3001'); // Replace with your backend URL

// interface Message {
//   _id: string;
//   text: string;
//   user: { _id: string; name: string };
//   createdAt: Date;
// }

// const ChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     // Listen for new messages from the server
//     socket.on('receiveMessage', (message: Message) => {
//       setMessages((prevMessages) => [message, ...prevMessages]);
//     });

//     // Listen for "typing" status updates
//     socket.on('typing', (data: { isTyping: boolean; user: string }) => {
//       if (data.user !== 'Customer') {
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
//         user: { _id: '1', name: 'Customer' },
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
//     socket.emit('typing', { isTyping: text.length > 0, user: 'Customer' });
//   };

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user._id === '1' ? styles.userMessage : styles.riderMessage,
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

//       {isTyping && <Text style={styles.typingIndicator}>Admin is typing...</Text>}

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
//   userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
//   riderMessage: { backgroundColor: '#EAEAEA', alignSelf: 'flex-start' },
//   messageText: { fontSize: 16, color: '#000' },
//   inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
//   input: { flex: 1, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#ddd', marginRight: 10 },
//   sendButton: { backgroundColor: '#0078FF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
//   sendButtonText: { color: '#fff', fontWeight: 'bold' },
//   typingIndicator: { textAlign: 'center', fontSize: 14, color: '#666', marginVertical: 5 },
// });

// export default ChatScreen;




// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import { getDatabase, ref, push, onValue, update } from 'firebase/database';
// import { database } from '../../../firebaseConfig';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string };
//   createdAt: string;
// }

// const ChatScreen = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     // Fetch messages from Firebase Realtime Database
//     const messagesRef = ref(database, 'chat/messages');
//     const unsubscribe = onValue(messagesRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const loadedMessages = Object.entries(data).map(([key, value]: [string, any]) => ({
//           id: key,
//           ...value,
//         }));
//         setMessages(loadedMessages.reverse());
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const message = {
//         text: newMessage,
//         user: { id: '1', name: 'Customer' },
//         createdAt: new Date().toISOString(),
//       };
//       await push(ref(database, 'chat/messages'), message);
//       setNewMessage('');
//     }
//   };

//   const handleTyping = (text: string) => {
//     setNewMessage(text);
//     update(ref(database, 'chat/typing'), { user: 'Customer', isTyping: text.length > 0 });
//   };

//   useEffect(() => {
//     // Listen for typing events
//     const typingRef = ref(database, 'chat/typing');
//     const unsubscribe = onValue(typingRef, (snapshot) => {
//       const data = snapshot.val();
//       setIsTyping(data?.isTyping && data.user !== 'Customer');
//     });

//     return () => unsubscribe();
//   }, []);

//   const renderItem = ({ item }: { item: Message }) => (
//     <View
//       style={[
//         styles.messageContainer,
//         item.user.id === '1' ? styles.userMessage : styles.adminMessage,
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
//       {isTyping && <Text style={styles.typingIndicator}>Admin is typing...</Text>}
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
//   userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
//   adminMessage: { backgroundColor: '#EAEAEA', alignSelf: 'flex-start' },
//   messageText: { fontSize: 16, color: '#000' },
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
//   sendButton: { backgroundColor: '#0078FF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
//   sendButtonText: { color: '#fff', fontWeight: 'bold' },
//   typingIndicator: { textAlign: 'center', fontSize: 14, color: '#666', marginVertical: 5 },
// });

// export default ChatScreen;



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
import { database } from '../../../../firebaseConfig'; // Adjust the path as per your project structure

interface Message {
  id: string;
  text: string;
  user: { id: string; name: string };
  createdAt: string;
}

interface ChatScreenProps {
  userId: string; // e.g., 'admin' or 'user123'
  userName: string; // e.g., 'Admin' or 'User'
}
// const userId='cus123'

const ChatScreen: React.FC<ChatScreenProps> = ({ userId='cus123', userName='customer' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUser = { id: userId, name: userName };

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
        setMessages(
          messagesArray.sort((a, b) =>
            b.createdAt.localeCompare(a.createdAt)
          )
        );
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
        user: currentUser,
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
        item.user.id === currentUser.id
          ? styles.currentUserMessage
          : styles.otherUserMessage,
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
  currentUserMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherUserMessage: {
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

export default ChatScreen;
