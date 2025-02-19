import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: '1', name: 'Barber' },
  { id: '2', name: 'Hair salon' },
  { id: '3', name: 'Makeup' },
  { id: '4', name: 'Packages' },
  { id: '5', name: 'Appointment' },
  { id: '6', name: 'Charges' },
  { id: '7', name: 'Staff' },
  { id: '8', name: 'Styles' },
  { id: '9', name: 'Reviews' },
];

interface SliderProps {
  activeId: string;
  setActiveId: (id: string) => void;
}

const Slider: React.FC<SliderProps> = ({ activeId, setActiveId }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            activeId === category.id && styles.activeCategoryItem,
          ]}
          onPress={() => setActiveId(category.id)}
        >
          <Text
            style={[
              styles.categoryText,
              activeId === category.id && styles.activeCategoryText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
    marginTop: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    minWidth: 110,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    height: 45,
    backgroundColor: '#fffffd', // Default (inactive) background color
  },
  activeCategoryItem: {
    backgroundColor: '#9A51DC', // Active background color
  },
  categoryText: {
    fontSize: 15,
    color: 'black', // Default (inactive) text color
    textAlign: 'center',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFFFFF', // Active text color
  },
});

export default Slider;
