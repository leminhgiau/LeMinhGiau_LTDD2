import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Header Component
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}></Text>
    </View>
  );
};

// Body Component
const Body = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiUserData, setApiUserData] = useState(null);

  useEffect(() => {
    const fetchApiUserData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/users/1');
        setApiUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchApiUserData();
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      alert('Vui lòng nhập cả tên người dùng và mật khẩu');
      return;
    }

    if (!apiUserData) {
      alert('Không tìm nạp được dữ liệu người dùng. Vui lòng thử lại.');
      return;
    }

    const apiUsername = apiUserData.username;
    const apiPassword = apiUserData.password;

    if (username === apiUsername && password === apiPassword) {
      alert('Đăng nhập thành công!');
      navigation.push('Home');
    } else {
      alert('Sai username hoặc password');
    }
  };

  return (
    <View style={styles.body}>
      <View style={styles.inputContainer}>
        <Icon name="user" style={styles.icon} />
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.txtInput}
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.txtInput}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
};

// Footer Component
const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.footer}>
      <View style={styles.borderContainer}>
        <View style={styles.borderLeft} />
        <Text style={styles.footerText}>Or</Text>
        <View style={styles.borderRight} />
      </View>
      <TouchableOpacity style={styles.loginButtonGoogle}>
        <Icon name="google" style={styles.icongoogle} />
        <Text style={styles.loginButtonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButtonFacebook}>
        <Icon name="facebook" style={styles.iconfacebook} />
        <Text style={styles.loginButtonText}>Sign in with Facebook</Text>
      </TouchableOpacity>

      <Text style={styles.Test}>Don't have an account?</Text>
      <TouchableOpacity style={styles.SignUpdButton} onPress={() => navigation.push('Register')}>
        <Text style={styles.signupText}>Sign up here</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 70,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    marginBottom: 20, 
    width: 300,
  },
  txtInput: {
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    color: 'white',
    flex: 1,
  },
  loginButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10, 
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  icon: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 10,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', 
    marginVertical: 10, 
    marginRight: 10, 
  },
  forgotPasswordText: {
    color: '#ecf0f1',
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 50,
  },
  borderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  borderLeft: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  borderRight: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  footerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal: 10,
  },
  loginButtonGoogle: {
    backgroundColor: '#4EEE94',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonFacebook: {
    backgroundColor: '#00F5FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 17,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icongoogle: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  iconfacebook: {
    fontSize: 20,
    color: 'white',
    marginRight: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  Test: {
    color : 'white',
    fontSize: 14,
    marginTop: 10,
  }
  
});

export default function Login({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -274}
      style={styles.container}
    >
      <Image
        source={{ uri: 'https://i.pinimg.com/736x/22/85/c8/2285c8d90ca546025f168bc9fd5da2d7.jpg' }}
        style={styles.image}
      />
      <Header />
      <Body navigation={navigation} />
      <Footer />
    </KeyboardAvoidingView>
  );
}
