// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
// import {BASE_URL} from '@env';

// // Define the types for the form data
// interface SignUpForm {
//     first_name: string;
//     last_name: string;
//     email: string;
//     password: string;
//     phone?: string;
//     countryCode?: string;
// }

// export default function SignUpScreen() {
//     // Define state for form data
//     const [formData, setFormData] = useState<SignUpForm>({
//         first_name: '',
//         last_name: '',
//         email: '',
//         password: '',
//         phone: '',
//         countryCode: '',
//     });

//     // Handle input changes
//     const handleInputChange = (name: keyof SignUpForm, value: string) => {
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     // Function to handle form submission
//     const handleSubmit = async () => {
//         try {
//             const response = await fetch(`${BASE_URL}/auth/signup`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     role: 'client', 
//                 }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 // Handle successful registration
//                 Alert.alert('Success', 'Registration successful!');
//             } else {
//                 // Handle errors from the API
//                 Alert.alert('Error', data.message || 'Something went wrong.');
//             }
//         } catch (error) {
//             // Handle network or other errors
//             Alert.alert('Error', 'Network error. Please try again.');
//         }
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.content}>
//                 <Text style={styles.title}>Sign up</Text>

//                 {/* Social login buttons */}
//                 <View style={styles.socialButtons}>
//                     <TouchableOpacity style={styles.socialButton}>
//                         <Image
//                             source={require('../assets/google-icon.png')} // Path to your Google icon image
//                             style={styles.socialIcon}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.socialButton}>
//                         <Image
//                             source={require('../assets/facebook-icon.png')} // Path to your Facebook icon image
//                             style={styles.socialIcon}
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.socialButton}>
//                         <Image
//                             source={require('../assets/icons8-apple-512.png')} // Path to your Apple icon image
//                             style={styles.socialIcon}
//                         />
//                     </TouchableOpacity>
//                 </View>

//                 <Text style={styles.dividerText}>Or, register with email...</Text>

//                 {/* Input fields */}
//                 <View style={styles.inputContainer}>
//                     {/* First Name */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/user-icon.png')} // User icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="First Name"
//                             placeholderTextColor="#999"
//                             value={formData.first_name}
//                             onChangeText={(text) => handleInputChange('first_name', text)}
//                         />
//                     </View>

//                     {/* Last Name */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/user-icon.png')} // User icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Last Name"
//                             placeholderTextColor="#999"
//                             value={formData.last_name}
//                             onChangeText={(text) => handleInputChange('last_name', text)}
//                         />
//                     </View>

//                     {/* Email */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/email-icon.png')} // Email icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Email ID"
//                             placeholderTextColor="#999"
//                             keyboardType="email-address"
//                             autoCapitalize="none"
//                             value={formData.email}
//                             onChangeText={(text) => handleInputChange('email', text)}
//                         />
//                     </View>

//                     {/* Password */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/password.png')} // Password icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Password"
//                             placeholderTextColor="#999"
//                             secureTextEntry
//                             value={formData.password}
//                             onChangeText={(text) => handleInputChange('password', text)}
//                         />
//                     </View>

//                     {/* Phone (Optional) */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/phone-icon.png')} // Phone icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Phone (Optional)"
//                             placeholderTextColor="#999"
//                             value={formData.phone}
//                             onChangeText={(text) => handleInputChange('phone', text)}
//                         />
//                     </View>

//                     {/* Country Code (Optional) */}
//                     <View style={styles.inputWrapper}>
//                         <Image
//                             source={require('../assets/email-icon.png')} // Email icon from assets
//                             style={styles.inputIcon}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Country Code"
//                             placeholderTextColor="#999"
//                             value={formData.countryCode}
//                             onChangeText={(text) => handleInputChange('countryCode', text)}
//                         />
//                     </View>
//                 </View>

//                 {/* Sign up button */}
//                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//                     <Text style={styles.buttonText}>Sign Up</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     content: {
//         padding: 24,
//         marginTop: 10,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#000',
//         marginBottom: 24,
//     },
//     socialButtons: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         gap: 10,
//         marginBottom: 24,
//     },
//     socialButton: {
//         width: 80,
//         height: 50,
//         borderWidth: 1,
//         borderColor: '#e1e1e1',
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 12,
//         borderRadius: 12,
//     },
//     socialIcon: {
//         width: 24,
//         height: 24,
//     },
//     dividerText: {
//         color: '#666',
//         textAlign: 'center',
//         marginBottom: 24,
//     },
//     inputContainer: {
//         gap: 16,
//     },
//     inputWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: '#e1e1e1',
//         paddingHorizontal: 12,
//     },
//     inputIcon: {
//         width: 20,
//         height: 20,
//         marginRight: 8,
//     },
//     input: {
//         flex: 1,
//         height: 48,
//         color: '#000',
//         fontSize: 16,
//     },
//     button: {
//         backgroundColor: '#2F80ED',
//         paddingVertical: 12,
//         borderRadius: 8,
//         marginTop: 24,
//     },
//     buttonText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontSize: 18,
//     },
// });




import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import { BASE_URL } from '@env';
import { StackNavigationProp } from '@react-navigation/stack';

interface SignUpForm {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    countryCode?: string;
}

type RootStackParamList = {
    SignUp: undefined;
    Login: undefined;
};

interface SignUpScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
}

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
    const [formData, setFormData] = useState<SignUpForm>({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone: '',
        countryCode: '',
    });

    const handleInputChange = (name: keyof SignUpForm, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const { first_name, last_name, email, password, phone, countryCode } = formData;
        if (!first_name || !last_name || !email || !password) {
            return 'Please fill in all the required fields.';
        }
        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            Alert.alert('Error', validationError);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    role: 'client',
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Registration successful!');
            } else {
                Alert.alert('Error', data.message || 'Something went wrong.');
            }
        } catch (error) {
            Alert.alert('Error', 'Network error. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Sign up</Text>

                {/* Social login buttons */}
                <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/facebook-icon.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../assets/icons8-apple-512.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.dividerText}>Or, register with email...</Text>

                {/* Input fields */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/user-icon.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="First Name"
                            placeholderTextColor="#999"
                            value={formData.first_name}
                            onChangeText={(text) => handleInputChange('first_name', text)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/user-icon.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            placeholderTextColor="#999"
                            value={formData.last_name}
                            onChangeText={(text) => handleInputChange('last_name', text)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/email-icon.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email ID"
                            placeholderTextColor="#999"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/password.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={formData.password}
                            onChangeText={(text) => handleInputChange('password', text)}
                        />
                    </View>

                    {/* Optional Fields */}
                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/phone-icon.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone (Optional)"
                            placeholderTextColor="#999"
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Image source={require('../assets/email-icon.png')} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Country Code"
                            placeholderTextColor="#999"
                            value={formData.countryCode}
                            onChangeText={(text) => handleInputChange('countryCode', text)}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 24,
        marginTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 24,
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 24,
    },
    socialButton: {
        width: 80,
        height: 50,
        borderWidth: 1,
        borderColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    socialIcon: {
        width: 24,
        height: 24,
    },
    dividerText: {
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputContainer: {
        gap: 16,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        paddingHorizontal: 12,
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    input: {
        flex: 1,
        height: 48,
        color: '#000',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2F80ED',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    loginLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    loginText: {
        color: '#2F80ED',
        fontSize: 16,
    },
});
