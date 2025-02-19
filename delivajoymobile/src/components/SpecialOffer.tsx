import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.95;

interface SpecialOfferProps {
    index: number;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ index }) => {
    const imageUrl = require('../assets/Attracting-new-salon-customers.jpg'); // Static image

    const specialOffers = [


        {
            title: "Handsome Jacks Shawlands",
            location: "1096 Pollokshaws Road, Glasgow",
            price: "$19.00/Hour",
            discount: "Save up to 15%",
            imageUrl: { uri: "https://lh3.googleusercontent.com/p/AF1QipPpVbN6PyOsjp-Ym0npYSYtNSfUwgop6BGww-_y=w768-h768-n-o-v1" }, // Dynamic image URL
        },
        {
            title: "Curl Up & Dye",
            location: "456 High Street, Edinburgh",
            price: "$25.00/Hour",
            discount: "Save up to 15%",
            imageUrl: require('../assets/Attracting-new-salon-customers.jpg'), // Static image<Image source={imageUrl} style={styles.image} resizeMode="cover" />

        },
        {
            title: "Scissors & Razors",
            location: "789 Main Road, Aberdeen",
            price: "$22.00/Hour",
            discount: "Save up to 12%",
            imageUrl: require('../assets/Attracting-new-salon-customers.jpg'), // Static image<Image source={imageUrl} style={styles.image} resizeMode="cover" />

        },
        {
            title: "The Hair Loft",
            location: "321 Bridge Street, Dundee",
            price: "$20.00/Hour",
            discount: "Save up to 8%",
            imageUrl: require('../assets/Attracting-new-salon-customers.jpg'), // Static image<Image source={imageUrl} style={styles.image} resizeMode="cover" />

        },
    ];

    const offer = specialOffers[index % specialOffers.length];

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image source={offer.imageUrl} style={styles.image} resizeMode="cover" />
                <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{offer.discount}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{offer.title}</Text>
                    <Text style={styles.location}>{offer.location}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{offer.price}</Text>
                        <TouchableOpacity style={styles.arrowButton}>
                            <Image
                                source={require('../assets/icons8-arrow-60.png')}
                                style={styles.arrowIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    arrowIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
});

export default SpecialOffer;
