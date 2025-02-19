import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: '1', name: 'Barber', icon: 'scissors' },
  { id: '2', name: 'Hair salon', icon: 'user' },
  { id: '3', name: 'Makeup', icon: 'star' },
  { id: '4', name: 'Packages', icon: 'scissors' },
  { id: '5', name: 'Appointment', icon: 'user' },
  { id: '6', name: 'Charges', icon: 'star' },
  { id: '7', name: 'Staff', icon: 'scissors' },
  { id: '8', name: 'Styles', icon: 'user' },
  { id: '9', name: 'Reviews', icon: 'star' },
];

interface CategorySliderProps {
  activeId: string;
  setActiveId: (id: string) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({ activeId, setActiveId }) => {
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
          <View
            style={[
              styles.iconContainer,
              activeId === category.id && styles.activeIconContainer,
            ]}
          >
            <Image
              source={require(`../assets/icons8-barbershop-50.png`)} // Adjust the path if necessary
              style={[
                styles.icon,
                { tintColor: activeId === category.id ? '#9A51DC' : '#A44ADA' },
              ]}
            />
          </View>
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
    marginRight: 16,
    minWidth: 110,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 45,
  },
  activeCategoryItem: {
    backgroundColor: '#9A51DC',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#F2E6FF',
    marginLeft: -13,
  },
  activeIconContainer: {
    backgroundColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
  },
  categoryText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
  },
});

export default CategorySlider;
