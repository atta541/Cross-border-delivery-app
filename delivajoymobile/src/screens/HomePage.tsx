import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, ScrollView, Text, TouchableOpacity } from 'react-native';
import Avatar from '../components/Avatar';
import SearchBar from '../components/SearchBar';
import CategorySlider from '../components/CategorySlider';
import SpecialOffer from '../components/SpecialOffer';
import Recommended from '../components/Recommended';
import Slider from '../components/Slider'
import Flowers from '../components/flowers';
// import CardCollection from './CardCollection';
import { StripeProvider } from '@stripe/stripe-react-native';
import BasketScreen from '../components/Basket/BasketScreen';
import FloatingToggle from '../components/Basket/FloatingToggle';
import { useNavigation } from '@react-navigation/native';


const HomePage = () => {

  const navigation = useNavigation();

  const [activeId, setActiveId] = useState('1');
  const [sliderActiveId,setSliderActiveId] = useState('1')

  const categoryContent: { [key: string]: { title: string; details: string } } = {
    '1': { title: 'Barber Details', details: 'Find the best barbers in town!' },
    '2': { title: 'Hair Salon Details', details: 'Professional hair care and styling.' },
    '3': { title: 'Makeup Details', details: 'Get the perfect look for any occasion.' },
    '4': { title: 'Packages Details', details: 'Affordable packages for all services.' },
    '5': { title: 'Appointment Details', details: 'Schedule your visit easily.' },
    '6': { title: 'Charges Details', details: 'Transparent pricing for all services.' },
    '7': { title: 'Staff Details', details: 'Meet our skilled team members.' },
    '8': { title: 'Styles Details', details: 'Explore trending hairstyles.' },
    '9': { title: 'Reviews Details', details: 'See what our customers say.' },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Fixed Components */}
      <View style={styles.fixedHeader}>
        <Avatar
          // name="Hazel"
          imageUrl="https://media.istockphoto.com/id/1045886560/photo/portrait-of-smiling-handsome-man-in-blue-t-shirt-standing-with-crossed-arms-isolated-on-grey.jpg?s=612x612&w=0&k=20&c=TX1-1UJ3PKonFEmgs_WDZf7wtfqKVMHYjeRaYjaZ1Rc="
        />
        <SearchBar />
        {/* <CategorySlider activeId={activeId} setActiveId={setActiveId} /> */}
        {/* <Slider activeId={sliderActiveId} setActiveId={setSliderActiveId} /> */}


       
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {categoryContent[activeId] && (
            <>
              <View style={styles.header}>
                <Text style={styles.specialOfferText}>Special Offers</Text>
                <TouchableOpacity style={styles.seeAllButton}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}>
                {[0, 1, 2, 3].map((index) => (
                  <SpecialOffer key={index} index={index} />
                ))}
              </ScrollView>

              

              <View style={styles.Recommendedheader}>
                <Text style={styles.RecommendedText}>Recommendeeeed For You</Text>
                <TouchableOpacity style={styles.RecommendedSeeAllButton}>
                  <Text style={styles.RecommendedSeeAllText}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}>
                {[0, 1, 2, 3].map((index) => (
                  <Recommended key={index} index={index} />
                ))} 
              </ScrollView>


              <View style={styles.Recommendedheader}>
                <Text style={styles.RecommendedText}>Products For You</Text>
                <TouchableOpacity style={styles.RecommendedSeeAllButton}>
                  <Text style={styles.RecommendedSeeAllText}>See All</Text>
                </TouchableOpacity>
              </View>


              <ScrollView showsVerticalScrollIndicator={false}>
                <Flowers />
            </ScrollView>
            {/* <CardCollection /> Usage of CardCollection */}
    
      {/* <BasketScreen  /> */}
      <View style={styles.container}>
      {/* Your HomePage content */}
      <FloatingToggle onPress={() => navigation.navigate('BasketScreen')} />
    </View>

            </>

          )}
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
  }
  ,
  RecommendedSeeAllButton: {
    padding: 8,

  },
  RecommendedSeeAllText: {
    fontSize: 14,
    color: '#a846d4',
    fontWeight: '600',
  }
});

export default HomePage;
