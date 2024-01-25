import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import Product_detial from './components/Product_detail';
import Cart from './components/Cart';
import HomeBar from './components/HomeBar';
import Login from './components/Login';
import MenProduct from './components/MenProduct';
import WomenProduct from './components/WomenProduct';
import ElectronicsProduct from './components/ElectronicsProduct';
import JeweleryProduct from './components/JeweleryProduct';


import { CartProvider } from './CartProvider/CartContext';
import Payment from './components/Payment';
import Search from './components/Search';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Header></Header>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="SingleProduct" component={Product_detial} options={{ headerTitle: 'Chi tiết sản phẩm' }} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="MenProduct" component={MenProduct} />
          <Stack.Screen name="ElectronicsProduct" component={ElectronicsProduct} />
          <Stack.Screen name="WomenProduct" component={WomenProduct} />
          <Stack.Screen name="JeweleryProduct" component={JeweleryProduct} />



        </Stack.Navigator>
        <HomeBar></HomeBar>
      </NavigationContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});