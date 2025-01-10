import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { _create } from '../utils/apiUtils'; // Utility for API calls

const { width, height } = Dimensions.get('window'); // Get device dimensions

const VerifyOtpCreatePassword = ({ route }) => {
  const { email } = useLocalSearchParams(); // Access email passed from the signup screen
  const [timer, setTimer] = useState(300); // 2 minutes countdown
  const [otp, setOtp] = useState(''); // Single OTP string
  const [otpExpired, setOtpExpired] = useState(false); // OTP expiration state
  const [message, setMessage] = useState(''); // State to store the message from the backend
  const router = useRouter(); // Use Expo Router

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setOtpExpired(true); // Mark OTP as expired when timer reaches 0
    }
  }, [timer]);

  // Function to verify OTP using the utility function
  const verifyOtp = async (otpString) => {
    try {
      // Make the API call for OTP verification
      const response = await _create('/api/users/auth/signupverification', { email, otp: otpString });
  
      // Log the request and response for debugging
      console.log('API Request:', { email, otp: otpString });
      console.log('API Response:', response);
  
      // Assuming response.message is returned and the message indicates success
      if (response.message && response.message.includes('successfully')) {
        // Use the message from the backend response
        Alert.alert('OTP Verified!', response.message || 'You are successfully verified.');
        setMessage(response.message || 'OTP Verified successfully!');
        router.push({
          pathname: 'createPassword',
          params: { otp: otpString, email }, // Pass both otp and email to the next screen
        });
      } else {
        // Display the error message from the response
        Alert.alert('Invalid OTP', 'Please enter the correct OTP.');
        setMessage('Invalid OTP, please try again.');
      }
    } catch (error) {
      console.log('Error during OTP verification:', error); // Log the error to the console
      Alert.alert('Error', 'There was an issue with OTP verification.');
      setMessage('Error with OTP verification, please try again.');
    }
  };
  

  // Function to resend OTP using the utility function
  const resendOtp = async () => {
    try {
      // const response = await _create('/resend-otp', { email });
      // Log the API call for resending OTP
      console.log('Resend OTP API Request:', { email });

      // Simulate successful OTP resend response
      const response = { success: true };

      if (response.success) {
        Alert.alert('OTP Sent', 'We have sent a new OTP to your email.');
        setTimer(120); // Reset timer to 2 minutes
        setOtpExpired(false); // Reset OTP expiration status
      } else {
        Alert.alert('Error', 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.log('Error during OTP resend:', error);
      Alert.alert('Error', 'There was an issue resending the OTP.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/localKonnectLogo.png')} // Same logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* OTP Verification Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.description}>
          We sent a one-time password link to your email address {email}
        </Text>
        <Text style={styles.expiry}>
          {otpExpired ? 'OTP has expired.' : `Expires in ${Math.floor(timer / 60)}:${timer % 60}`}
        </Text>

        {/* OTP Input Field */}
        <TextInput
          value={otp}
          onChangeText={(text) => setOtp(text)}
          keyboardType="numeric"
          maxLength={6}
          style={styles.otpInput}
          placeholder="Enter OTP"
          editable={!otpExpired} // Disable input if OTP is expired
        />

        {/* Verify OTP Button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => verifyOtp(otp)}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

        {/* Response Message */}
        {message ? <Text style={styles.responseMessage}>{message}</Text> : null}

        {/* Resend Link and Contact */}
        <View style={styles.footerContainer}>
          {otpExpired ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.footerText}>OTP expired. Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.footerText}>Didn't receive OTP? Resend link</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => router.push('contact')}>
            <Text style={styles.footerText}>Have a problem? Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: width * 0.4, // Responsive width
    height: width * 0.4, // Responsive height
    marginBottom: height * 0.05, // Responsive margin
  },
  formContainer: {
    width: '90%',
    maxWidth: 400, // Max width for large devices
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#217B95',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: width * 0.04, // Responsive font size
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  expiry: {
    fontSize: width * 0.04, // Responsive font size
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpInput: {
    width: width * 0.8, // Responsive width for OTP input
    height: width * 0.12, // Responsive height for OTP input
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: width * 0.06, // Responsive font size
    marginBottom: 20,
  },
  nextButton: {
    width: '100%',
    padding: width * 0.05, // Responsive padding
    backgroundColor: '#D8A15D',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.05, // Responsive font size
    fontWeight: 'bold',
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: width * 0.035, // Responsive font size
    textDecorationLine: 'underline',
    marginVertical: 5,
  },
  responseMessage: {
    color: 'red',
    textAlign: 'center',
    fontSize: width * 0.04, // Responsive font size
    marginTop: 10,
  },
});

export default VerifyOtpCreatePassword;
