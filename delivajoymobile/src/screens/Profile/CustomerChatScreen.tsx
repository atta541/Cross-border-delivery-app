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
//   Image,
// } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { ref, push, onValue, update } from 'firebase/database';
// import { database } from '../../../firebaseConfig';
// import { BASE_URL } from '@env';
// import { useBasketFunctions } from '../../components/Basket/functions';

// interface Message {
//   id: string;
//   text: string;
//   user: { id: string; name: string; role: string };
//   createdAt: string;
//   read: boolean;
//   metadata?: { title: string; description: string; price: string; image: string };
// }

// const CustomerChatScreen: React.FC = () => {
//   const { userToken } = useContext(AuthContext);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [userId, setUserId] = useState<string>('');
//   const [metadata, setMetadata] = useState<any | null>(null);
//   const [userName, setUserName] = useState<string>('');
//   const [userRole, setUserRole] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [cart, setCart] = useState<any[]>([]); // Cart state to store added items

//   const { addItemToBasket } = useBasketFunctions();


//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!userToken) return;

//       try {
//         const response = await fetch(`${BASE_URL}/users/me`, {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${userToken}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setUserId(data.stripeCustomerId);
//           setUserName(`${data.first_name} ${data.last_name}`);
//           setUserRole(data.role);
//         } else {
//           Alert.alert('Error', data.message || 'Something went wrong');
//         }
//       } catch (error) {
//         Alert.alert('Error', 'Unable to fetch user data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [userToken]);

//   useEffect(() => {
//     const dbRef = ref(database, 'messages/');
//     const unsubscribe = onValue(dbRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         const messagesArray = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setMessages(
//           messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
//         );
//         messagesArray.forEach((msg) => {
//           if (msg.user.id !== userId && !msg.read) {
//             update(ref(database, `messages/${msg.id}`), { read: true });
//           }
//         });
//       }
//     });

//     return () => unsubscribe();
//   }, [userId]);

//   const handleSendMessage = async () => {
//     if (newMessage.trim()) {
//       const message = {
//         text: newMessage,
//         metadata,
//         user: { id: userId, name: userName, role: userRole },
//         createdAt: new Date().toISOString(),
//         read: false,
//       };

//       const dbRef = ref(database, 'messages/');
//       await push(dbRef, message);
//       setNewMessage('');
//       setMetadata(null);
//       update(ref(database, 'typing/'), { userId, isTyping: false });
//     }


//     // const handleAddToBasket = () => {
//     //   addItemToBasket('6787cd86b6f274dc9365f41a', '1'); // Example product and quantity
//     // };

//     // handleAddToBasket();
//   };



//   const handleTyping = (text: string) => {
//     setNewMessage(text);

//     if (text.startsWith('https') || text.includes('https')) {
//       const fetchMetadata = async () => {
//         try {
//           const url = `${BASE_URL}/chat-basket/metadata?url=${encodeURIComponent(text)}`;
//           const response = await fetch(url);
//           const data = await response.json();
//           console.log("dataaa"+data.data);
//           if (response.ok) {
//             setMetadata(data.data);
//           } else {
//             Alert.alert('Error', data.message || 'Unable to fetch metadata');
//           }
//         } catch (error) {
//           Alert.alert('Error', 'Unable to fetch metadata. Please try again later.');
//         }
//       };

//       fetchMetadata();
//     } else {
//       setMetadata(null);
//     }

//     update(ref(database, 'typing/'), { userId, isTyping: !!text.trim() });
//   };


//   const handleAddToCart = async (item: any) => {
//     try {
//       const sanitizedPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));

//       if (isNaN(sanitizedPrice)) {
//         Alert.alert('Error', 'Invalid price format.');
//         return;
//       }

//       const response = await fetch(`${BASE_URL}/chat-basket/add`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           price: sanitizedPrice, // Use the sanitized price
//           name: item.title,
//           Image: item.image,


//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         Alert.alert(
//           'Success',
//           'Item added to cart successfully!',
//           [
//             {
//               text: 'Continue Shopping',
//               onPress: () => {
//                 // Clear metadata and reset the input
//                 setMetadata(null); // Clear metadata
//                 setNewMessage(''); // Optionally clear the chat input
//               },
//               style: 'default',
//             },
//             {
//               text: 'Checkout',
//               onPress: () => {
//                 // Navigate to checkout page or process checkout
//                 console.log('Proceeding to checkout...');
//               },
//               style: 'cancel',
//             },
//           ],
//           { cancelable: false }
//         );
//         // Optionally update cart state
//         setCart((prevCart) => [...prevCart, item]); // Update local cart state
//       } else {
//         Alert.alert('Error', data.message || 'Failed to add item to cart.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to add item to cart. Please try again later.');
//     }
//   };

//   if (loading) return <Text>Loading...</Text>;

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       {isTyping && <Text style={styles.typingIndicator}>User is typing...</Text>}
//       <FlatList
//         data={messages}
//         renderItem={({ item }) => (
//           <View
//             style={[
//               styles.messageContainer,
//               item.user.id === userId
//                 ? styles.currentUserMessage
//                 : styles.otherUserMessage,
//             ]}
//           >
//             <Text style={styles.messageText}>{item.text}</Text>
//             {item.metadata && (
//               <View style={styles.metadataContainer}>
//                 <Text style={styles.metadataTitle}>{item.metadata.title}</Text>
//                 <Text style={styles.metadataDescription}>
//                   {item.metadata.description || 'No description available'}
//                 </Text>
//                 <Text style={styles.metadataPrice}>
//                   {item.metadata.price || 'Price not available'}
//                 </Text>
//                 <Image
//                   source={{ uri: item.metadata.image }}
//                   style={styles.metadataImage}
//                 />
//                 <TouchableOpacity
//                   style={styles.addToCartButton}
//                   onPress={() => handleAddToCart(item.metadata)}
//                 >
//                   <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             <Text style={styles.userName}>{item.user.name}</Text>
//             <Text style={styles.timestamp}>
//               {new Date(item.createdAt).toLocaleTimeString([], {
//                 hour: '2-digit',
//                 minute: '2-digit',
//               })}
//             </Text>
//           </View>
//         )}
//         keyExtractor={(item) => item.id}
//         style={styles.messageList}
//       />

// {metadata && (
//   <View style={styles.metadataPreview}>
//     <Text style={styles.metadataTitle}>{metadata.title}</Text>
//     <Text style={styles.metadataPrice}>Price: {metadata.price}</Text>
//     <Text style={styles.metadataDescription}>
//       {metadata.description || 'No description available'}
//     </Text>
//     <Image
//       source={{ uri: metadata.image }}
//       style={styles.metadataImage}
//     />
//     <View style={styles.buttoncantainer}>

//     <TouchableOpacity
//       style={styles.cancelButton}
//       onPress={() => {
//         setMetadata(null); // Clear metadata
//         if (newMessage.startsWith('https') || newMessage.includes('https')) {
//           setNewMessage(''); // Clear URL from input
//         }
//       }}
//     >
//       <Text style={styles.cancelButtonText}>Cancel</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       style={styles.addToCartButton}
//       onPress={() => handleAddToCart(metadata)}
//     >
//       <Text style={styles.addToCartButtonText}>Add to Cart</Text>
//     </TouchableOpacity>

//     </View>
//   </View>
// )}

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
//   currentUserMessage: {
//     backgroundColor: '#DCF8C6',
//     alignSelf: 'flex-end',
//   },
//   otherUserMessage: {
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
//   timestamp: {
//     fontSize: 10,
//     color: '#888',
//     marginTop: 5,
//     textAlign: 'right',
//   },
//   readReceipt: {
//     fontSize: 10,
//     color: '#0078FF',
//     marginTop: 2,
//     textAlign: 'right',
//   },
//   typingIndicator: {
//     fontSize: 14,
//     fontStyle: 'italic',
//     color: '#555',
//     padding: 10,
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
//   metadataContainer: {
//     marginTop: 5,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 8,
//     padding: 10,
//   },
//   metadataTitle: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     marginBottom: 5,
//   },
//   metadataDescription: {
//     fontSize: 12,
//     color: '#555',
//   },
//   metadataPrice: {
//     fontSize: 12,
//     color: '#0078FF',
//     marginTop: 5,
//   },
//   metadataImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 5,
//     marginTop: 5,
//   },
//   metadataPreview: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//   },
//   buttoncantainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   addToCartButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     marginTop: 10,
//     width: '48%',
//   },
//   addToCartButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   cancelButton: {
//     marginTop: 10,
//     padding: 10,
//     backgroundColor: '#FF4C4C',
//     alignItems: 'center',
//     width: '48%',
//     borderRadius: 20, 


//   },
//   cancelButtonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },

// });

// export default CustomerChatScreen;



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
  Image,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { ref, push, onValue, update } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import { BASE_URL } from '@env';
import { useBasketFunctions } from '../../components/Basket/functions';

interface Message {
  id: string;
  text: string;
  user: { id: string; name: string; role: string };
  createdAt: string;
  read: boolean;
  metadata?: { title: string; description: string; price: string; image: string };
  messageType?: string;
}

const CustomerChatScreen: React.FC = () => {
  const { userToken } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [metadata, setMetadata] = useState<any | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userRole, setUserRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<any[]>([]);
  const [isPasted, setIsPasted] = useState<boolean>(false); // Track if metadata was pasted

  const { addItemToBasket } = useBasketFunctions();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userToken) return;

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
          setUserId(data.stripeCustomerId);
          setUserName(`${data.first_name} ${data.last_name}`);
          setUserRole(data.role);
        } else {
          Alert.alert('Error', data.message || 'Something went wrong');
        }
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userToken]);

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
          messagesArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        );
        messagesArray.forEach((msg) => {
          if (msg.user.id !== userId && !msg.read) {
            update(ref(database, `messages/${msg.id}`), { read: true });
          }
        });
      }
    });
    

    return () => unsubscribe();
  }, [userId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        metadata,
        user: { id: userId, name: userName, role: userRole },
        createdAt: new Date().toISOString(),
        read: false,
        messageType: metadata ? 'orderItem' : 'text',
      };

      const dbRef = ref(database, 'messages/');
      await push(dbRef, message);
      setNewMessage('');
      setMetadata(null);
      setIsPasted(false); // Reset pasted flag after sending message
      update(ref(database, 'typing/'), { userId, isTyping: false });
    }
  };

  const handleTyping = (text: string) => {
    setNewMessage(text);

    if (text.startsWith('https') || text.includes('https')) {
      const fetchMetadata = async () => {
        try {
          const url = `${BASE_URL}/chat-basket/metadata?url=${encodeURIComponent(text)}`;
          const response = await fetch(url);
          const data = await response.json();
          if (response.ok) {
            setMetadata(data.data);
            setIsPasted(false); // URL is typed, not pasted
          } else {
            Alert.alert('Error', data.message || 'Unable to fetch metadata');
          }
        } catch (error) {
          Alert.alert('Error', 'Unable to fetch metadata. Please try again later.');
        }
      };

      fetchMetadata();
    } else {
      setMetadata(null);
    }

    update(ref(database, 'typing/'), { userId, isTyping: !!text.trim() });
  };

  const handlePaste = () => {
    setIsPasted(true); // Set flag when user pastes a URL
  };

  const handleAddToCart = async (item: any) => {
    try {
      const sanitizedPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));

      if (isNaN(sanitizedPrice)) {
        Alert.alert('Error', 'Invalid price format.');
        return;
      }

      const response = await fetch(`${BASE_URL}/chat-basket/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: sanitizedPrice,
          name: item.title,
          Image: item.image,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Item added to cart successfully!',
          [
            {
              text: 'Continue Shopping',
              onPress: () => {
                setMetadata(null);
                setNewMessage('');
              },
              style: 'default',
            },
            {
              text: 'Checkout',
              onPress: () => {
                console.log('Proceeding to checkout...');
              },
              style: 'cancel',
            },
          ],
          { cancelable: false }
        );

        setCart((prevCart) => [...prevCart, item]);
      } else {
        Alert.alert('Error', data.message || 'Failed to add item to cart.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to add item to cart. Please try again later.');
    }
  };

  if (loading) return <Text>Loading...</Text>;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {isTyping && <Text style={styles.typingIndicator}>User is typing...</Text>}
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.user.id === userId
                ? styles.currentUserMessage
                : styles.otherUserMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            {item.metadata && (
              <View style={styles.metadataContainer}>
                <Text style={styles.metadataTitle}>{item.metadata.title}</Text>
                <Text style={styles.metadataDescription}>
                  {item.metadata.description || 'No description available'}
                </Text>
                <Text style={styles.metadataPrice}>
                  {item.metadata.price || 'Price not available'}
                </Text>
                <Image
                  source={{ uri: item.metadata.image }}
                  style={styles.metadataImage}
                />
                {isPasted && (
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item.metadata)}
                  >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.timestamp}>
              {new Date(item.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
      />

      {metadata && !isPasted && (
        <View style={styles.metadataPreview}>
          <Text style={styles.metadataTitle}>{metadata.title}</Text>
          <Text style={styles.metadataPrice}>Price: {metadata.price}</Text>
          <Text style={styles.metadataDescription}>
            {metadata.description || 'No description available'}
          </Text>
          <Image
            source={{ uri: metadata.image }}
            style={styles.metadataImage}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setMetadata(null);
                setNewMessage('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(metadata)}
            >
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={handleTyping}
          placeholder="Type a message..."

        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
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
    // backgroundColor: '#DCF8C6',
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-end',
    // borderRadius: 20 20 0 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 0,

  },
  otherUserMessage: {
    backgroundColor: '#EAEAEA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'black',
  },
  userName: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
    fontStyle: 'italic',
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
    textAlign: 'right',
  },
  readReceipt: {
    fontSize: 10,
    color: '#0078FF',
    marginTop: 2,
    textAlign: 'right',
  },
  typingIndicator: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    padding: 10,
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
    borderColor: 'black',
    marginRight: 10,
    height: 40,
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
  metadataContainer: {
    marginTop: 5,
    backgroundColor: '#F7F5FF',
    borderRadius: 8,
    padding: 10,
  },
  metadataTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  metadataDescription: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',

  },
  metadataPrice: {
    fontSize: 16,
    color: '#0078FF',
    marginTop: 5,
  },

  metadataImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 5,
    resizeMode: "contain", 
  },
  metadataPreview: {
    marginBottom: 0,
    padding: 10,
    backgroundColor: '#F7F5FF',
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,  
    borderBottomRightRadius: 0, 
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 5,
    marginLeft: 5,
  }
,  
  buttoncantainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    width: '48%',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#FF4C4C',
    alignItems: 'center',
    width: '48%',
    borderRadius: 20,


  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  }

});

export default CustomerChatScreen;

