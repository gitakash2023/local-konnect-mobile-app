import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons for Sign-in buttons
import { router } from 'expo-router';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please fill in both fields.');
      return;
    }
    console.log('Login clicked');
    // Proceed with login logic
  };

  const goToSignUp =
  () => {
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
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
        <Text style={styles.signUpText} onPress={goToSignUp}>Sign-up</Text>
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
