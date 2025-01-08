import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons for Sign-in buttons
import { router } from 'expo-router';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [selectedRole, setSelectedRole] = useState(''); // State to track selected role

  const handleSignUp = () => {
    if (!selectedRole) {
      Alert.alert('Role Selection', 'Please select a role to proceed.');
      return;
    }
    console.log('Sign Up clicked with role:', selectedRole);
    router.push('verifyOtpCreatePassword');
  };

  const goToSignIn = () => {
    router.push('login'); // Navigate to Sign-In screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign-up</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter email/phone"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter referral code (Optional)"
        value={referralCode}
        onChangeText={setReferralCode}
      />

      {/* Role Selection */}
      <Text style={styles.roleText}>Select your role:</Text>
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => setSelectedRole('Service Provider')}
      >
        <Ionicons
          name={selectedRole === 'Service Provider' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color="#00796b"
        />
        <Text style={styles.radioText}>I am a Service Provider</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.radioButton}
        onPress={() => setSelectedRole('User')}
      >
        <Ionicons
          name={selectedRole === 'User' ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color="#00796b"
        />
        <Text style={styles.radioText}>I am a User</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Social Media Sign Up */}
      <Text style={styles.orText}>or Sign up with</Text>
      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sign In Link */}
      <Text style={styles.signInLink}>
        Already have an account?{' '}
        <Text style={styles.signInText} onPress={goToSignIn}>Log-in</Text>
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
    roleText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1e88e5', // Deep blue text
      marginVertical: 15,
    },
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    radioText: {
      fontSize: 16,
      color: '#333',
      marginLeft: 10,
    },
    signUpButton: {
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
    signInLink: {
      marginTop: 20,
      fontSize: 16,
      color: '#333',
    },
    signInText: {
      fontWeight: 'bold',
      color: '#1e88e5', // Blue text for link
    },
  });
  
  

export default SignUpScreen;
