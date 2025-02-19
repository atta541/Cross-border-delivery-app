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

// const UploadDocument = () => {
//   const { userToken } = useContext(AuthContext); // Access user token from context
//   const [accountId, setAccountId] = useState('');
//   const [selectedFile, setSelectedFile] = useState<DocumentPickerResponse | null>(null);

//   useEffect(() => {
//     const fetchAccountId = async () => {
//       if (!userToken) return;

//       try {
//         const response = await fetch('http://192.168.1.5:3001/users/me', {
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
//       const response = await fetch('http://192.168.1.5:3001/verification/upload-verification-document', {
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

// export default UploadDocument;

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












// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
// import { Camera, CameraType, CameraApi } from 'react-native-camera-kit'; 
// import { AuthContext } from '../../context/AuthContext';

// const UploadDocument = () => {
//   const { userToken } = useContext(AuthContext);
//   const [accountId, setAccountId] = useState<string | null>(null);
//   const [capturedFiles, setCapturedFiles] = useState<{ front: string | null, back: string | null }>({
//     front: null,
//     back: null,
//   });
//   const [side, setSide] = useState<'front' | 'back'>('front');
//   const [stage, setStage] = useState(0); // New state to manage steps
//   const cameraRef = useRef<CameraApi | null>(null);

//   const fetchAccountId = async () => {
//     if (!userToken) return;
//     try {
//       const response = await fetch('http://192.168.1.5:3001/users/me', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${userToken}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setAccountId(data.stripeCustomerId);
//       } else {
//         Alert.alert('Error', data.message || 'Something went wrong');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Unable to fetch account ID. Please try again later.');
//     }
//   };

//   const captureImage = async () => {
//     if (!cameraRef.current) return;

//     try {
//       const data = await cameraRef.current.capture();
//       const uri = data?.uri;
//       if (uri) {
//         if (side === 'front') {
//           setCapturedFiles(prev => ({ ...prev, front: uri }));
//           setSide('back');
//           setStage(2); // Move to back side stage
//           Alert.alert('Front Side Captured', 'Now capture the back side of the ID.');
//         } else {
//           setCapturedFiles(prev => ({ ...prev, back: uri }));
//           setStage(3); // Ready for submission
//           Alert.alert('Back Side Captured', 'Both sides have been captured.');
//         }
//       } else {
//         Alert.alert('Error', 'No photo was captured.');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Capture failed. Please try again.');
//     }
//   };

//   const uploadDocument = async () => {
//     if (!accountId || !capturedFiles.front || !capturedFiles.back) {
//       Alert.alert('Error', 'Please capture both front and back sides of the ID.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('account_id', accountId);
//     formData.append('file_front', {
//       uri: capturedFiles.front,
//       name: 'front.jpg',
//       type: 'image/jpeg',
//     });
//     formData.append('file_back', {
//       uri: capturedFiles.back,
//       name: 'back.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await fetch('http://192.168.1.5:3001/verification/upload-verification-document', {
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

//   useEffect(() => {
//     fetchAccountId();
//   }, [userToken]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Document Verification for Riders</Text>
      
//       {stage === 0 && (
//         <TouchableOpacity style={styles.uploadButton} onPress={() => setStage(1)}>
//           <Text style={styles.uploadButtonText}>Verify Documents</Text>
//         </TouchableOpacity>
//       )}

//       {stage === 1 && (
//         <>
//           <Text style={styles.sideLabel}>Please capture the front side of your ID card</Text>
//           <View style={styles.cameraContainer}>
//             <Camera
//               ref={cameraRef}
//               style={styles.camera}
//               cameraType={CameraType.Back}
//               flashMode="on"
//             />
//             {/* Overlay Rectangular Box */}
//             <View style={styles.overlayBox}></View>
//           </View>
//           <TouchableOpacity style={styles.uploadButton} onPress={captureImage}>
//             <Text style={styles.uploadButtonText}>Capture Front Side</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {stage === 2 && (
//         <>
//           <Text style={styles.sideLabel}>Please capture the back side of your ID card</Text>
//           <View style={styles.cameraContainer}>
//             <Camera
//               ref={cameraRef}
//               style={styles.camera}
//               cameraType={CameraType.Back}
//               flashMode="on"
//             />
//             {/* Overlay Rectangular Box */}
//             <View style={styles.overlayBox}></View>
//           </View>
//           <TouchableOpacity style={styles.uploadButton} onPress={captureImage}>
//             <Text style={styles.uploadButtonText}>Capture Back Side</Text>
//           </TouchableOpacity>
//         </>
//       )}

//       {stage === 3 && (
//         <>
//           <Text style={styles.sideLabel}>Both sides captured! Ready to upload.</Text>
//           <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
//             <Text style={styles.uploadButtonText}>Submit Document</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </View>
//   );
// };

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
//   sideLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#007BFF',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   cameraContainer: {
//     flex: 1,
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     flex: 1,
//     width: '100%',
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   overlayBox: {
//     position: 'absolute',
//     width: '90%',
//     height: '50%',
//     borderColor: '#007BFG',
//     borderWidth: 3,
//     borderRadius: 10,
//   },
//   uploadButton: {
//     backgroundColor: '#28a745',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   uploadButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default UploadDocument;



import React, { useState, useContext, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Camera, CameraType, CameraApi } from 'react-native-camera-kit';
import { AuthContext } from '../../context/AuthContext';
import {BASE_URL} from '@env';


const UploadDocument = () => {
  const { userToken } = useContext(AuthContext);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [capturedFiles, setCapturedFiles] = useState<{ front: string | null, back: string | null }>({
    front: null,
    back: null,
  });
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [stage, setStage] = useState(0);
  const cameraRef = useRef<CameraApi | null>(null);

  const fetchAccountId = async () => {
    if (!userToken) return;
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAccountId(data.stripeCustomerId);
      } else {
        Alert.alert('Error', data.message || 'Unable to fetch account ID.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while fetching account ID.');
    }
  };

 
  const checkVerificationStatus = async (accountId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/verification/check-verification-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account_id: accountId }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.status === 'verified') {
          Alert.alert('Status', 'Your account is already verified. No action is needed.');
        } else {
          setStage(1); // Proceed to upload flow
        }
      } else {
        Alert.alert('Error', data.message || 'Unable to check verification status.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while checking verification status.');
      console.error(error);
    }
  };
  
  const captureImage = async () => {
    if (!cameraRef.current) return;

    try {
      const data = await cameraRef.current.capture();
      const uri = data?.uri;
      if (uri) {
        if (side === 'front') {
          setCapturedFiles(prev => ({ ...prev, front: uri }));
          setSide('back');
          setStage(2);
          Alert.alert('Front Side Captured', 'Now capture the back side of the ID.');
        } else {
          setCapturedFiles(prev => ({ ...prev, back: uri }));
          setStage(3);
          Alert.alert('Back Side Captured', 'Both sides have been captured.');
        }
      } else {
        Alert.alert('Error', 'No photo was captured.');
      }
    } catch (error) {
      Alert.alert('Error', 'Capture failed. Please try again.');
    }
  };

  const uploadDocument = async () => {
    if (!accountId || !capturedFiles.front || !capturedFiles.back) {
      Alert.alert('Error', 'Please capture both front and back sides of the ID.');
      return;
    }

    const formData = new FormData();
    formData.append('account_id', accountId);
    formData.append('file_front', {
      uri: capturedFiles.front,
      name: 'front.jpg',
      type: 'image/jpeg',
    });
    formData.append('file_back', {
      uri: capturedFiles.back,
      name: 'back.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(`${BASE_URL}/verification/upload-verification-document`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Document uploaded successfully.');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred while uploading documentss.');
      console.error(error);
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      await fetchAccountId();
      if (accountId) {
        await checkVerificationStatus(accountId);
      }
    };

    checkStatus();
  }, [userToken, accountId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Verification</Text>

      {stage === 0 && (
        <TouchableOpacity style={styles.uploadButton} onPress={() => accountId && checkVerificationStatus(accountId)}>
          <Text style={styles.uploadButtonText}>Check Verification Status</Text>
        </TouchableOpacity>
      )}

      {stage === 1 && (
        <>
          <Text style={styles.sideLabel}>Capture the front side of your ID</Text>
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              cameraType={CameraType.Back}
              flashMode="on"
            />
            <View style={styles.overlayBox}></View>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={captureImage}>
            <Text style={styles.uploadButtonText}>Capture Front Side</Text>
          </TouchableOpacity>
        </>
      )}

      {stage === 2 && (
        <>
          <Text style={styles.sideLabel}>Capture the back side of your ID</Text>
          <View style={styles.cameraContainer}>
            <Camera
              ref={cameraRef}
              style={styles.camera}
              cameraType={CameraType.Back}
              flashMode="on"
            />
            <View style={styles.overlayBox}></View>
          </View>
          <TouchableOpacity style={styles.uploadButton} onPress={captureImage}>
            <Text style={styles.uploadButtonText}>Capture Back Side</Text>
          </TouchableOpacity>
        </>
      )}

      {stage === 3 && (
        <>
          <Text style={styles.sideLabel}>Both sides captured! Ready to upload.</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={uploadDocument}>
            <Text style={styles.uploadButtonText}>Submit Document</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sideLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    borderRadius: 8,
    marginBottom: 16,
  },
  overlayBox: {
    position: 'absolute',
    width: '90%',
    height: '50%',
    borderColor: '#007BFG',
    borderWidth: 3,
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UploadDocument;
