import React from 'react';
import { View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar } from '@rneui/base';

const products = [
    { id: 1, name: 'Product 1', price: '100.000đ', image: require('../../assets/banphim.jpg') },
    { id: 2, name: 'Product 2', price: '200.000đ', image: require('../../assets/banphim.jpg') },
    { id: 3, name: 'Product 3', price: '300.000đ', image: require('../../assets/banphim.jpg') },
];

const renderProduct = (item) => (
    <View style={styles.productItem}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
    </View>
);

function HomeScreen() {
    return (
        <ScrollView>
        <View style={styles.container}>
                       <Icon name="bars"
     size={25}
    color="black" 
    style={styles.icon1}/>
     

     <SearchBar style={styles.search} 
     />


            <Text style={styles.title}>Welcome to My Shop</Text>
            <Image source={require('../../assets/fonten.jpg')} style={styles.logo} />
            <Text style={styles.title}>All product</Text>
            <ScrollView horizontal>
                {products.map((item) => renderProduct(item))}
            </ScrollView>
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    logo: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    productItem: {
        alignItems: 'center',
        marginRight: 16,
      },
      productImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        marginBottom: 8,
        borderRadius: 4,
      },
      productName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      productPrice: {
        fontSize: 14,
        color: 'green',
      },
});

export default HomeScreen;