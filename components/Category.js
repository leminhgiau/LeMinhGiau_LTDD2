import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Category() {
  const navigation = useNavigation();

  const images = [
    require('../images/icons8-t-shirt-64.png'),
    require('../images/icons8-dress-48.png'),
    require('../images/icons8-electronic-64.png'),
    require('../images/icons8-jewelery-16.png'),
    require('../images/icons8-other-48.png'),
  ];

  const handleImagePress = (index) => {
    // Xử lý khi ảnh được nhấn
    // Dựa vào index để xác định màn hình đích
    switch (index) {
      case 0:
        navigation.navigate('MenProduct');
        break;
      case 1:
        navigation.navigate('WomenProduct');
        break;
      case 2:
        navigation.navigate('ElectronicsProduct');
        break;
      case 3:
        navigation.navigate('JeweleryProduct');
        break;
      case 4:
        navigation.navigate('ManHinh5');
        break;
      default:
        // Xử lý khi không tìm thấy index
        break;
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.imageContainer}
    >
      {images.map((image, index) => (
        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 80,
    marginHorizontal: 10,
  },
});
