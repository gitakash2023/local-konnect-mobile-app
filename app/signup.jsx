import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import {_create} from '../utils/apiUtils'; // Assuming this is your utility function

const { width, height } = Dimensions.get('window'); // Get screen dimensions for responsiveness

const SignUpScreen = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      // referralCode: '',
      userType: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Email is required'),
      userType: Yup.string().required('Please select a userType'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await _create('/api/users/auth/signup', values);
        if (response.error) {
          Alert.alert('Error', response.error); // Show error if backend responds with an error
        } else {
          Alert.alert('Success', 'Sign-up successful!');
          router.push({
            pathname: 'verifyOtpCreatePassword',
            params: { email: values.email }, // Pass the email to the next screen
          });
        }
       
      } catch (error) {
        console.error("Sign-up error: ", error);
        Alert.alert('Sign-up failed. Please try again.');
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/localKonnectLogo.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Input Fields */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}

        <Text style={styles.label}>Referral Code (Optional)</Text>
        <TextInput
          value={formik.values.referralCode}
          onChangeText={formik.handleChange('referralCode')}
          style={styles.input}
          placeholder="Enter referral code"
          placeholderTextColor="#aaa"
        />

        {/* userType Selection */}
        <Text style={styles.userTypeText}>Select your userType:</Text>
        <TouchableOpacity
          style={[
            styles.radioButton,
            formik.values.userType === 'ServiceProvider' && styles.radioButtonActive,
          ]}
          onPress={() => formik.setFieldValue('userType', 'ServiceProvider')}
        >
          <Ionicons
            name={formik.values.userType === 'ServiceProvider' ? 'radio-button-on' : 'radio-button-off'}
            size={24}
            color="#fff"
          />
          <Text style={styles.radioText}>I am a Service Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            formik.values.userType === 'User' && styles.radioButtonActive,
          ]}
          onPress={() => formik.setFieldValue('userType', 'User')}
        >
          <Ionicons
            name={formik.values.userType === 'User' ? 'radio-button-on' : 'radio-button-off'}
            size={24}
            color="#fff"
          />
          <Text style={styles.radioText}>I am a User</Text>
        </TouchableOpacity>
        {formik.touched.userType && formik.errors.userType && (
          <Text style={styles.errorText}>{formik.errors.userType}</Text>
        )}

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Social Login Buttons */}
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={24} color="#DB4437" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
        </View>

        {/* Already have an account? */}
        <TouchableOpacity onPress={() => router.push('login')}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
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
    backgroundColor: '#FFFFFF',
   
  },
  logo: {
    width: width * 0.4,
    height: height * 0.2,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#217B95',
    borderRadius: 10,
    paddingVertical: 20, 
    paddingHorizontal: 15, 
  },
  label: {
    fontSize: width * 0.04,
    color: '#fff',
    marginBottom: 5, 
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 7,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: width * 0.04,
  },
  errorText: {
    color: 'indianred',
    alignSelf: 'flex-start',
  },
  userTypeText: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
   
    padding: 10,
    borderRadius: 5,
  },
  radioButtonActive: {
    backgroundColor: '#ffffff20',
  },
  radioText: {
    fontSize: width * 0.04,
    color: '#fff',
    marginLeft: 10,
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
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
  },
  socialButton: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  loginText: {
    color: '#D8A15D',
    textAlign: 'center',
    marginTop: 10,
    fontSize: width * 0.04,
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;
