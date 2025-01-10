import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons for Sign-in buttons
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing token and roles
import { _create } from '../utils/apiUtils'; // Import utility function

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const postData = { email, password };
      const response = await _create('/api/admin/login-superadmin', postData);

      console.log('Response from _create:', response);

      if (response && response.token && response.user?.userType) {
        const userType = response.user?.userType;
  
        // Store token and roles in AsyncStorage
        await AsyncStorage.setItem('accessToken', response.token); // Correct key name
        await AsyncStorage.setItem('userType', userType); // Correct key name

        // Navigate based on user role
        switch (userType) {
          case 'superadmin':
            router.push('/superadmin/(superadmintabs)');
            break;
          case 'admin':
            router.push('/admin/(admintabs)');
            break;
          case 'user':
            router.push('/user/(usertabs)');
            break;
          default:
            console.warn('Unknown role:', userType);
            Alert.alert('Login Error', 'Unknown user role!');
            break;
        }
      } else {
        Alert.alert('Login Error', 'Invalid credentials or response from server.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignUp = () => {
    router.push('signup'); // Navigate to Sign-Up screen
  };

  const goToForgotPassword = () => {
    router.push('forgotPassword'); // Navigate to Forgot Password screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log-in</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter email/phone"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging In...' : 'Log In'}</Text>
      </TouchableOpacity>

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={goToForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

      {/* Social Media Login */}
      <Text style={styles.orText}>or Log in with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signUpLink}>
        Don't have an account?{' '}
        <Text style={styles.signUpText} onPress={goToSignUp}>
          Sign-up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e3f2fd', // Light blue background
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e88e5', // Deep blue text
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#1e88e5', // Deep blue border
    borderWidth: 1,
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fbc02d', // Yellow background for button
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#1e88e5', // Blue text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 16,
    color: '#1e88e5', // Link color matching Sign-Up
    textDecorationLine: 'underline',
  },
  orText: {
    fontSize: 16,
    marginVertical: 10,
    color: '#333',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  socialButton: {
    backgroundColor: '#1e88e5', // Blue background for social buttons
    padding: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpLink: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#1e88e5', // Blue text for link
  },
});

export default LoginScreen;
