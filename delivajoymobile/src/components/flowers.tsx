// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
// import {BASE_URL} from '@env';

// const { width } = Dimensions.get('window');
// const cardWidth = width * 0.95;

// type Flower = {
//   primaryImageUrl: string; // Updated property
//   discount?: string;
//   name: string; // Updated property
//   location?: string; // Optional if location does not exist in the API
//   price: string;
// };

// const Flowers = () => {
//   const [flowers, setFlowers] = useState<Flower[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Fetch flowers from the API
//   useEffect(() => {
//     const fetchFlowers = async () => {
//       try {
//         console.log('a');

//         const response = await fetch(`${BASE_URL}/products`);
//         const data = await response.json();
//         // console.log
//         setFlowers(data); // Assuming API returns an array of flowers
//       } catch (error) {
//         setError('Failed to load flowers');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFlowers();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#6200EE" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
//       {flowers.map((flower, index) => (
//         <View key={index} style={styles.container}>
//           <View style={styles.card}> 
//             {/* Update image to use primaryImageUrl */}
//             <Image source={{ uri: flower.primaryImageUrl }} style={styles.image} resizeMode="cover" />
            
//             <View style={styles.discountBadge}>
//               <Text style={styles.discountText}>{flower.discount || 'No Discount'}</Text>
//             </View>
            
//             <View style={styles.infoContainer}>
//               {/* Update title to use flower.name */}
//               <Text style={styles.title}>{flower.name}</Text>
//               {flower.location && <Text style={styles.location}>{flower.location}</Text>}
              
//               <View style={styles.priceContainer}>
//                 <Text style={styles.price}>PKR {flower.price}</Text>
//                 <TouchableOpacity style={styles.arrowButton}>
//                   <Image
//                     source={require('../assets/icons8-arrow-60.png')}
//                     style={styles.arrowIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 16,
//   },
//   container: {
//     width: cardWidth,
//     marginRight: 16,
//     height: 400,
//   },
//   card: {
//     position: 'relative',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     height: 310,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '96%',
//     height: 180,
//     borderRadius: 15,
//     alignSelf: 'center',
//     marginTop: 10,
//     marginBottom: 10,

// },
//   discountBadge: {
//     position: 'absolute',
//     top: 12,
//     right: 12,
//     backgroundColor: '#EFE4FF',
//     borderRadius: 12,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     zIndex: 1,
//   },
//   discountText: {
//     color: '#6200EE',
//     fontWeight: '600',
//     fontSize: 12,
//   },
//   infoContainer: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginTop: -12,
//   },
//   location: {
//     fontSize: 14,
//     color: '#888',
//     marginBottom: 8,
//   },
//   priceContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   price: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#6200EE',
//     marginTop: -10,
//   },
//   arrowButton: {
//     backgroundColor: '#9A51DC',
//     borderRadius: 50,
//     padding: 8,
//   },
//   arrowIcon: {
//     width: 24,
//     height: 24,
//     tintColor: 'white',
//   },
//   scrollViewContent: {
//     paddingHorizontal: 10,
//   },
// });

// export default Flowers;





import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, ScrollView } from 'react-native';
import { BASE_URL } from '@env';
import { useBasketFunctions } from '.././components/Basket/functions';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.95;

type Flower = {
  primaryImageUrl: string;
  discount?: string;
  name: string;
  location?: string;
  price: string;
  _id: string; 
};

const Flowers = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItemToBasket } = useBasketFunctions();

  // Fetch flowers from the API
  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        console.log('Fetching products...');
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        console.log('Fetched data:', data);
        setFlowers(data); // Assuming API returns an array of flowers
      } catch (error) {
        setError('Failed to load flowers');
      } finally {
        setLoading(false);
      }
    };

    fetchFlowers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View> 
    ); 
  }

  // Function to add item to basket with default quantity 1
  const handleAddToBasket = (_id: string) => { 
     
    console.log(`Adding product ${_id} to basket`);
    addItemToBasket(_id, '1'); // Pass product ID and quantity 1
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
      {flowers.map((flower, index) => (
        <View key={index} style={styles.container}>
          <View style={styles.card}> 
            <Image source={{ uri: flower.primaryImageUrl }} style={styles.image} resizeMode="cover" />
            
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{flower.discount || 'No Discount'}</Text>
            </View>
            
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{flower.name}</Text>
              {flower.location && <Text style={styles.location}>{flower.location}</Text>}
              
              <View style={styles.priceContainer}>
                <Text style={styles.price}>PKR {flower.price}</Text>
                <TouchableOpacity 
                  style={styles.arrowButton}
                  onPress={() => handleAddToBasket(flower._id)} // Pass product ID
                >
                  <Image
                    source={require('../assets/icons8-add-to-cart-64.png')} 
                    style={styles.cartIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  container: {
    width: cardWidth,
    marginRight: 16,
    height: 400,
  },
  card: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 16,
    height: 310,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '96%',
    height: 180,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EFE4FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  discountText: {
    color: '#6200EE',
    fontWeight: '600',
    fontSize: 12,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: -12,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
    marginTop: -10,
  },
  arrowButton: {
    backgroundColor: '#9A51DC',
    borderRadius: 50,
    padding: 8,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    color: 'black',
  },
  scrollViewContent: {
    paddingHorizontal: 10,
  },
});

export default Flowers;
