import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleForgotPassword = () => {
    console.log("Phone Number for Forgot Password: ", phoneNumber);
    router.push('/verifyOtpResetPassword'); // Navigate to Verify OTP screen
  };

  const handleGoToLogin = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <Text style={styles.goBackText}>
        Remembered your password?{' '}
        <Text style={styles.loginLink} onPress={handleGoToLogin}>
          Log in
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
      backgroundColor: '#e3f2fd', // Light blue background to match the SignUpScreen
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#1e88e5', // Deep blue color for titles
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
    button: {
      width: '100%',
      padding: 15,
      backgroundColor: '#fbc02d', // Yellow background for buttons
      borderRadius: 8,
      alignItems: 'center',
      marginVertical: 20,
    },
    buttonText: {
      color: '#1e88e5', // Deep blue text for buttons
      fontSize: 18,
      fontWeight: 'bold',
    },
    goBackText: {
      fontSize: 16,
      color: '#333',
      marginTop: 20,
    },
    loginLink: {
      color: '#1e88e5', // Deep blue for login link
      fontWeight: 'bold',
    },
  });
  

export default ForgotPasswordScreen;
