import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { _create } from '../utils/apiUtils'; // Assuming _create is used for API calls
import { Formik } from 'formik';
import * as Yup from 'yup';

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
  });

  const handleForgotPassword = async (values) => {
    if (!values.email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Check if the email exists in the database
      const emailCheckResponse = await _create('/api/users/check-email', { email: values.email });
      if (emailCheckResponse.exists) {
        // Step 2: If email exists, send OTP
        const otpResponse = await _create('/api/users/send-otp', { email: values.email });
        if (otpResponse.success) {
          Alert.alert('Success', 'OTP sent to your email.');
          router.push('/verifyOtpResetPassword'); // Navigate to the OTP verification screen
        } else {
          Alert.alert('Error', 'Failed to send OTP. Please try again.');
        }
      } else {
        Alert.alert('Error', 'This email is not registered.');
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.push('/login'); // Navigate to the login screen
  };

  return (
    <View style={styles.screenContainer}>
      <Image
        source={require('../assets/images/localKonnectLogo.png')} // Ensure the image path is correct
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Forgot Password</Text>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={[styles.input, touched.email && errors.email ? { borderColor: 'red' } : {}]}
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Send OTP'}</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <Text style={styles.goBackText}>
          Remembered your password?{' '}
          <Text style={styles.loginLink} onPress={handleGoToLogin}>
            Log in
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // White background for the entire screen
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    backgroundColor: '#fff', // White background for logo
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: '#217B95', // Form container background color
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#D8A15D',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  goBackText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 20,
  },
  loginLink: {
    color: '#D8A15D',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  }
});

export default ForgotPasswordScreen;
