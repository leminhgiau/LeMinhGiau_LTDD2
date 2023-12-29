import { StyleSheet, Image, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.headerContainer}>
            <Image source={require('../assets/logo1.png')} style={styles.logo} />
            {/* <Text style={styles.headerText}>App Bán Hàng</Text> */}

        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 150,
        height: 180,
        marginLeft:10,
    },
});
