import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const menuItems = [
  { title: 'Account Information', route: 'AccountInformation' },
//   { title: 'Add Card', route: 'CardCollection' },
  { title: 'DocumentVerification', route: 'DocumentVerification' },
  {title:"UploadDocument", route:"UploadDocument"},
  { title: 'Order History', route: 'OrderHistory' },
  // { title: 'CustomerChatScreen', route: 'CustomerChatScreen' },
  // { title: 'Support', route: 'CustomerSupport' },
  {title:"Add Bank Account", route:"AddBankAccount"},
  {title:"Orders", route:"Orders"},


];

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => logout() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <ScrollView>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.menuItemContent}>
              <View style={styles.leftContent}>
                <Image
                  source={require('../../../../assets/icons8-user-96.png')}
                  style={styles.icon}
                />
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </View>
          </TouchableOpacity>
        ))}
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.menuItemContent}>
            <View style={styles.leftContent}>
              <Image
                source={require('../../../../assets/icons8-user-96.png')}
                style={styles.icon}
              />
              <Text style={styles.logoutText}>Log Out</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    padding: 20,
    color: '#000000',
  },
  menuItem: {
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    tintColor: '#0066FF',
  },
  menuItemText: {
    fontSize: 16,
    color: '#000000',
  },
  chevron: {
    fontSize: 24,
    color: '#0066FF',
  },
  logoutButton: {
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    fontSize: 16,
  },
});

export default Profile;
