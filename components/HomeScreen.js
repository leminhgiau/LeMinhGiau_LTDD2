import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Category from './Category';

export default function Home() {
    const navigation = useNavigation();
    const handleProductPress = (product) => {
        navigation.navigate('SingleProduct', { product });
    };

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]); // Thêm state cartItems

    useEffect(() => {
        getAllProduct();
    }, []);

    const getAllProduct = () => {
        axios
            .get('https://fakestoreapi.com/products')
            .then(function (response) {
                // handle success
                setProducts(response.data);
            })
            .catch(function (error) {
                // handle error
                alert(error.message);
            })
            .finally(function () {
                // always executed
                alert('Finally called');
            });
    };

    
    const handleAddToCartPress = async (product) => {
        try {
          const existingCart = await AsyncStorage.getItem("cart");
          let cart = existingCart ? JSON.parse(existingCart) : [];
    
          const existingProductIndex = cart.findIndex(
            (item) => item.id === product.id
          );
    
          if (existingProductIndex >= 0) {
            cart[existingProductIndex].quantity += 1;
          } else {
            product.quantity = 1;
            cart.push(product);
          }
          await AsyncStorage.setItem("cart", JSON.stringify(cart));
          alert("Thêm vào giỏ hàng thành công!");
        } catch (error) {
          console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
      };

    const handleCartPress = () => {
        navigation.navigate('Cart', { cartItems }); // Chuyển hướng tới trang Cart và truyền danh sách sản phẩm trong Cart
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản phẩm</Text>
            <ScrollView contentContainerStyle={styles.productContainer}>
                {products.map((product) => (
                    <TouchableOpacity
                        style={styles.productItem}
                        key={product.id}
                        onPress={() => handleProductPress(product)}
                    >
                        <Image style={styles.productImage} source={{ uri: product.image }} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product.title}</Text>
                            <Text style={styles.productPrice}>Price: ${product.price.toFixed(2)}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>Rating: </Text>
                                <FontAwesome name="star" style={styles.starIcon} />
                                <Text style={styles.ratingValue}>{product.rating.rate.toFixed(1)}</Text>
                                <Text style={styles.ratingCount}>({product.rating.count} reviews)</Text>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={() => handleProductPress(product)}
                                >
                                    <Text style={styles.buttonText}>Chi tiết</Text>
                                </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.cartButton}
                                  onPress={() => handleAddToCartPress(product)}
                              >
                                  <Text style={styles.buttonText}>Cart</Text>
                              </TouchableOpacity>
                                                           </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <TouchableOpacity style={styles.cartButton} onPress={handleCartPress}>
                    <Text style={styles.buttonText}>Giỏ hàng</Text>
                </TouchableOpacity>
                <Category />
            </View>
        );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
        borderRadius: 2,
        elevation: 2,
        backgroundColor: '#fff',
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    productItem: {
        width: '48%',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 2,
    },
    productImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    productDetails: {
        padding: 8,
    },
    productName: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 4,
        fontSize: 14,
    },
    ratingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom:2,
        
    },
    ratingText: {
        color: 'black',
    },
    starIcon: {
        color: 'gold',
        fontSize: 16,
        marginRight: 2,
    },
    ratingValue: {
        color: 'black',
        marginRight: 2,
    },
    ratingCount: {
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    detailsButton: {
        flex: 1,
        marginRight: 4,
        backgroundColor: '#F0E68C',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    cartButton: {
        flex: 1,
        marginLeft: 4,
        backgroundColor: '#F08080',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});