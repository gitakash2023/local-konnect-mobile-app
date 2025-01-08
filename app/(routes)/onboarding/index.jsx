import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Expo Icons
import { router } from 'expo-router';

const Onboarding = () => {
  const [step, setStep] = useState(0); // Track current step
 

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1); // Increment step
    } else {
      router.push('/signup'); // Redirect to Login screen after last step
    }
  };

  const steps = [
    {
      title: 'LOCAL KONNECT',
      description: 'Find Trusted Home Services at Your Fingertips!',
      detail: 'From electricians to gym trainers, negotiate and book services with ease.',
      icon: <Ionicons name="ios-home" size={50} color="#00796b" />,
      backgroundColor: '#e0f2f1',
      // image: require('../assets/onboarding1.png'), // Replace with image path
    },
    {
      title: 'Easy Booking Process',
      description: 'Find and book your service with a few taps.',
      detail: 'Search for your service, negotiate with providers, and confirm your schedule.',
      icon: <MaterialIcons name="flash-on" size={50} color="#f57c00" />,
      backgroundColor: '#fff3e0',
      // image: require('../assets/onboarding2.png'), // Replace with image path
    },
    {
      title: 'Three-Step Process',
      description: 'Simple, Fast, and Secure.',
      detail: 'Search, negotiate, and book your service hassle-free.',
      icon: <MaterialIcons name="build" size={50} color="#1976d2" />,
      backgroundColor: '#e3f2fd',
      // image: require('../assets/onboarding3.png'), // Replace with image path
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: steps[step].backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{steps[step].title}</Text>
        <View style={styles.iconContainer}>
          {steps[step].icon}
        </View>
      </View>

      <Image source={steps[step].image} style={styles.image} />

      <Text style={styles.description}>{steps[step].description}</Text>
      <Text style={styles.detail}>{steps[step].detail}</Text>

      <View style={styles.buttonContainer}>
        {step > 0 && (
          <TouchableOpacity style={styles.prevButton} onPress={() => setStep(step - 1)}>
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.getStartedBtn} onPress={handleNext}>
          <Text style={styles.getStartedText}>{step < 2 ? 'Next' : 'Get Started'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
    paddingHorizontal: 30,
  },
  detail: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 40,
    paddingHorizontal: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
  },
  prevButton: {
    backgroundColor: '#9E9E9E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    marginRight: 20,
  },
  getStartedBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Onboarding;
