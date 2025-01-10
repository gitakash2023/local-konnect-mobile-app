import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { _create } from '../utils/apiUtils';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import icons

const CreatePasswordScreen = ({ route }) => {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
      confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await _create('/api/users/auth/createpassword', { email, password: values.password });
        if (response && response.message) {
          Alert.alert('Success', response.message);
          router.push('login');
        } else {
          Alert.alert('Error', 'Failed to create password.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
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
        {/* Password Input */}
        <Text style={styles.label}>Enter New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}

        {/* Confirm Password Input */}
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={formik.values.confirmPassword}
            onChangeText={formik.handleChange('confirmPassword')}
            onBlur={formik.handleBlur('confirmPassword')}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity style={styles.createButton} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Create Password</Text>
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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#217B95',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    paddingHorizontal: 5,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
  },
  createButton: {
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
});

export default CreatePasswordScreen;
