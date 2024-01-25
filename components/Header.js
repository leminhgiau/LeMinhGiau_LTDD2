import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            {/* <Text style={[styles.text, styles.largeText]}>Minsu Shop</Text> */}
      {/* <StatusBar style="auto" /> */}

        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 80,
        height: 100,
    },
    text: {
        color: 'pink',
        fontWeight: 'bold',
    },
    largeText: {
        fontSize: 18,
    },
});
