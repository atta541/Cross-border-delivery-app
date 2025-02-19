// import React, { useRef } from 'react';
// import { View, StyleSheet, Animated, PanResponder, TouchableOpacity, Text } from 'react-native';

// const FloatingToggle = ({ onPress }: { onPress: () => void }) => {
//   const pan = useRef(new Animated.ValueXY()).current;

//   const panResponder = PanResponder.create({
//     onMoveShouldSetPanResponder: () => true,
//     onPanResponderMove: Animated.event(
//       [null, { dx: pan.x, dy: pan.y }],
//       { useNativeDriver: false } // Native driver is not supported for non-transform properties
//     ),
//     onPanResponderRelease: () => {
//       // Optionally, you can add logic to snap the toggle to a position
//     },
//   });

//   return (
//     <Animated.View
//       {...panResponder.panHandlers}
//       style={[styles.toggleContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
//     >
//       <TouchableOpacity style={styles.toggle} onPress={onPress}>
//         <Text style={styles.toggleText}>Toggle</Text>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   toggleContainer: {
//     position: 'absolute',
//     bottom: 100, // Initial position
//     right: 20,
//   },
//   toggle: {
//     width: 60,
//     height: 60,
//     backgroundColor: '#2196F3',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   toggleText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default FloatingToggle;




import React, { useRef } from 'react';
import { View, StyleSheet, Animated, PanResponder, TouchableOpacity, Image } from 'react-native';

const FloatingToggle = ({ onPress }: { onPress: () => void }) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false } // Native driver is not supported for non-transform properties
    ),
    onPanResponderRelease: () => {
      // Optionally, you can add logic to snap the toggle to a position
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.toggleContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }] }]}
    >
      <TouchableOpacity style={styles.toggle} onPress={onPress}>
        <Image source={require('../../assets/icons8-cart-100.png')} style={styles.icon} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    position: 'absolute',
    bottom: 100, // Initial position
    right: 20,
  },
  toggle: {
    width: 70, // Slightly larger for better visibility
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35, // Keep the circle shape
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    width: 40, // Adjust size of the icon
    height: 40, // Ensure it's centered within the button
  },
});

export default FloatingToggle;
