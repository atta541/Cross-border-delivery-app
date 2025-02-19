import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Main Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default MainPage;
