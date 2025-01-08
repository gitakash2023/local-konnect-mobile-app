import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; // Use Expo Router for navigation

const VerifyOtpResetPassword = () => {
  const [otp, setOtp] = useState('');

  const handleVerifyOtp = () => {
    // Verify OTP logic here (e.g., API call)
    console.log('OTP Verified!');
    router.push('resetCreatePassword'); // Redirect to Reset Password screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
      />

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#e3f2fd', // Light blue background for consistency
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
      borderColor: '#1e88e5', // Deep blue border to match the theme
      borderWidth: 1,
      fontSize: 16,
    },
    verifyButton: {
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
  });
  

export default VerifyOtpResetPassword;
