import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const cartData = await AsyncStorage.getItem('cart');
                if (cartData) {
                    const parsedCart = JSON.parse(cartData);

                    const updatedCart = parsedCart.map(item => ({
                        ...item,
                        quantity: item.quantity || 1,
                    }));

                    setCartItems(updatedCart);
                }
            } catch (error) {
                console.error('Lỗi khi đọc dữ liệu giỏ hàng:', error);
            }
        };

        loadCartItems();
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleDeleteItem = (itemId) => {
        const updatedCart = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCart);

        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Sản phẩm đã được xóa khỏi giỏ hàng');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };
    const handleDecreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);

        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Số lượng sản phẩm đã được giảm');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };

    const handleIncreaseQuantity = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);

        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Số lượng sản phẩm đã được tăng');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });
    };
    const handleReduceQuantity = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = Math.max(1, item.quantity - 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);

        AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
            .then(() => {
                console.log('Số lượng sản phẩm đã được giảm');
            })
            .catch((error) => {
                console.error('Lỗi khi lưu giỏ hàng mới:', error);
            });


    };

    const handleCheckout = () => {
        navigation.navigate('Payment');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={35} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Giỏ hàng của tôi</Text>
            {cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.cartItem}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productDetails}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.price}>Giá tiền: ${item.price}</Text>
                                <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
                                        <Icon name="plus" size={15} color="blue" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleReduceQuantity(item.id)}>
                                        <Icon name="minus" size={15} color="blue" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                                        <Icon name="remove" size={20} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.emptyCartText}>Giỏ hàng trống</Text>
            )}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng cộng:</Text>
                <Text style={styles.totalPrice}>${calculateTotalPrice()}</Text>
            </View>
            <TouchableOpacity style={styles.paymentButton} onPress={() => handleCheckout()}>
                <Text style={styles.paymentButtonText}>Thanh toán</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 80
    },
    cartItem: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 8,
    },
    productImage: {
        width: 100,
        height: 100,
        resizeMode: 'center',
        marginRight: 8,
    },
    productDetails: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        color: 'green',
    },
    quantity: {
        fontSize: 14,
        color: 'gray',
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 8,
        justifyContent: 'space-around'
    },
    actionButtonText: {
        color: 'blue',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalPrice: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold',
    },
    paymentButton: {
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    paymentButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    goBackButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        marginTop: 20
    }
});
