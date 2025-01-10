import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _create } from '../utils/apiUtils';

const LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email')
        .required('Email  is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('Form Submitted with values: ', values);

      try {
        const response = await _create('/api/users/auth/login', values);

        if (response && response.token && response.user) {
          const { token, user } = response;
          const userType = user?.userType;

          await AsyncStorage.setItem('accessToken', token);
          await AsyncStorage.setItem('userType', userType);

          switch (userType) {
            case 'ADMIN':
              router.push('/superadmin/(superadmintabs)');
              break;
            case 'ServiceProvider':
              router.push('/admin/(ServiceProvider)');
              break;
            case 'User':
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
    },
  });

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/localKonnectLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Form Container */}
      <View style={styles.formContainer}>
        {/* Email Field */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={formik.values.email}
          onChangeText={(text) => formik.handleChange('email')(text)}
          onBlur={formik.handleBlur('email')}
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
        />
        {formik.touched.email && formik.errors.email && (
          <Text style={styles.errorText}>{formik.errors.email}</Text>
        )}

        {/* Password Field */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            value={formik.values.password}
            onChangeText={(text) => formik.handleChange('password')(text)}
            onBlur={formik.handleBlur('password')}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}

        {/* Forgot Password Link */}
        <TouchableOpacity
          onPress={() => router.push('forgotPassword')} // Replace 'forgotpassword' with the actual route
          style={{ marginTop: 10 }}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={formik.handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
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

        {/* Sign Up Link */}
        <TouchableOpacity onPress={() => router.push('signup')}>
          <Text style={styles.loginText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>

        {/* Display Backend Response */}
        {/* {message && (
          <View style={styles.backendResponseContainer}>
            <Text style={styles.backendResponseText}>{message}</Text>
          </View>
        )} */}
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#217B95',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 2,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  errorText: {
    color: 'indianred',
    alignSelf: 'flex-start',
  },
  forgotPasswordText: {
    color: '#fff',
    textAlign: 'right',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginBottom: 10,
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
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
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
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  passwordContainer: {
    position: 'relative',
    marginVertical: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
 
});

export default LoginScreen;
