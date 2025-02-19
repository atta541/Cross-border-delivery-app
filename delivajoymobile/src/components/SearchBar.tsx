import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Image
          source={require('.././assets/icons8-search-100.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          placeholderTextColor="#666"
        />
      </View>
      <Image
          source={require('.././assets/icons8-search-100.png')}
          style={styles.filterIcon} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#FFFFFF',
    borderRadius: 28,
    paddingHorizontal: 12,
    marginRight: 12,
    height: 50,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  filterIcon: {
    width: 20,
    height: 20,
    padding: 8,
  },
});

export default SearchBar;
