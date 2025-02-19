import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: '1', name: 'New Orders', icon: 'scissors' },
  { id: '2', name: 'Active Orders', icon: 'user' },
  { id: '3', name: 'Completed', icon: 'star' },
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
          onPress={() => setActiveId(category.id)} // Update activeId when clicked
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
    backgroundColor: '#ffd8fd',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 45,
  },
  activeCategoryItem: {
    backgroundColor: '#9A51DC',
  },

  activeIconContainer: {
    backgroundColor: 'white',
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
