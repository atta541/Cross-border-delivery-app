// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const SearchPage = () => {
//   return (
//     <View>
//       <Text>SearchPage</Text>
//     </View>
//   )
// }

// export default SearchPage

// const styles = StyleSheet.create({})



import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import CategorySlider from '../components/CategorySlider';
import Slider from '../components/Slider';
import SpecialOffer from '../components/SpecialOffer';
import Recommended from '../components/Recommended';

const SearchPage = () => {
  const [activeId, setActiveId] = useState('1');
  const [sliderActiveId, setSliderActiveId] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fixed Components */}
      <View style={styles.fixedHeader}>
        <SearchBar />
        <CategorySlider activeId={activeId} setActiveId={setActiveId} />
        <Slider activeId={sliderActiveId} setActiveId={setSliderActiveId} />
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Special Offers Section */}
          <View style={styles.header}>
            <Text style={styles.specialOfferText}>Special Offers</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {[0, 1, 2, 3].map((index) => (
              <SpecialOffer key={index} index={index} />
            ))}
          </ScrollView>

          {/* Recommended Section */}
          <View style={styles.Recommendedheader}>
            <Text style={styles.RecommendedText}>Recommended For You</Text>
            <TouchableOpacity style={styles.RecommendedSeeAllButton}>
              <Text style={styles.RecommendedSeeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
          >
            {[0, 1, 2, 3].map((index) => (
              <Recommended key={index} index={index} />
            ))}
          </ScrollView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },
  fixedHeader: {
    
  },
  scrollView: {
    paddingBottom: 20,
  },
  content: {
    marginTop: 20,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  specialOfferText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllButton: {
    padding: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: '#a846d4',
    fontWeight: '600',
  },
  Recommendedheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
    marginLeft: 10,
    marginTop: -60,
  },
  RecommendedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  RecommendedSeeAllButton: {
    padding: 8,
  },
  RecommendedSeeAllText: {
    fontSize: 14,
    color: '#a846d4',
    fontWeight: '600',
  }
});

export default SearchPage;
