import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const JeweleryProduct = ({ navigateToProductDetail, addToCart }) => {
  const [data, setData] = useState(null);
  const navigation = useNavigation(); 

  useEffect(() => {
    getDataUsingSimpleGetCall(); 
  }, []); 

  const getDataUsingSimpleGetCall = () => {
    axios
      .get('https://fakestoreapi.com/products/category/jewelery')
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        alert(error.message);
      })
      .finally(function () {
        console.log('Finally called');
      });
  };
  

  const renderItem = (item) => (
    <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ProductDetail', { item })}>
      <View style={styles.productItem}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.scrollContainer}>
      <ScrollView style={styles.scrollView}>
          <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={35} color="black" />
          </TouchableOpacity>
        <View style={styles.home}>
          <Text style={styles.Text}>Đồ trang sức</Text>
          {data && data.map(renderItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  home: {
    alignItems: 'center',
  },
  Text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 40,
  },
  productItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 80,
  },
  productImage: {
    width: "100%",
    height: 200,
    aspectRatio: 1,
    resizeMode: 'center', 
  },
  productName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  productPrice: {
    marginTop: 5,
    fontSize: 20,
    color: 'green',
    textAlign: 'center',
  },
  goBackButton: {
    paddingTop: 35,
  }
});

export default JeweleryProduct;
