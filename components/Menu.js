import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Menu({ activeMenuItem, onMenuItemPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeMenuItem === 'HomeScreen' && styles.activeMenuItem,
        ]}
        onPress={() => onMenuItemPress('HomeScreen')}
      >
        <Text style={styles.menuItemText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeMenuItem === 'Login' && styles.activeMenuItem,
        ]}
        onPress={() => onMenuItemPress('Login')}
      >
        <Text style={styles.menuItemText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeMenuItem === 'Products' && styles.activeMenuItem,
        ]}
        onPress={() => onMenuItemPress('Products')}
      >
        <Text style={styles.menuItemText}>Category</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeMenuItem === 'Products' && styles.activeMenuItem,
        ]}
        onPress={() => onMenuItemPress('Products')}
      >
        <Text style={styles.menuItemText}>User</Text>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
  },
  menuItem: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  activeMenuItem: {
    backgroundColor: '#e0e0e0',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Menu;