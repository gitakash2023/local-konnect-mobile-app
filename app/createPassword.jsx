import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router'; // Use Expo Router for navigation

const CreatePasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreatePassword = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Create the password logic (API call or state update)
    console.log('Password created successfully!');
    router.push('login'); // Redirect to login screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.createButton} onPress={handleCreatePassword}>
        <Text style={styles.buttonText}>Create Password</Text>
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
    borderColor: '#1e88e5', // Deep blue border
    borderWidth: 1,
    fontSize: 16,
  },
  createButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fbc02d', // Yellow button for primary action
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#1e88e5', // Deep blue text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreatePasswordScreen;
