import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const VerifyOTPCreatePassword = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [resendEnabled, setResendEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval); // Clean up the interval
    } else {
      setResendEnabled(true); // Enable resend button after timer ends
    }
  }, [timer]);

  const handleVerifyOtp = () => {
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP.");
      return;
    }
    console.log("OTP entered: ", otp);
    router.push('/createPassword'); // Navigate to Reset Password screen
  };

  const handleResendOtp = () => {
    setTimer(180); // Reset timer to 3 minutes
    setResendEnabled(false);
    console.log("Resend OTP clicked");
    // Add logic for resending OTP
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <Text style={styles.timerText}>Time remaining: {formatTime(timer)}</Text>

      <TouchableOpacity
        style={[styles.resendButton, resendEnabled ? styles.resendButtonEnabled : styles.resendButtonDisabled]}
        onPress={handleResendOtp}
        disabled={!resendEnabled}
      >
        <Text style={resendEnabled ? styles.resendTextEnabled : styles.resendTextDisabled}>
          Resend OTP
        </Text>
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
    backgroundColor: '#e3f2fd', // Align background with SignUpScreen (light blue)
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e88e5', // Deep blue (consistent with SignUpScreen)
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
    backgroundColor: '#fbc02d', // Yellow (align with SignUp button style)
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#1e88e5', // Blue text for button
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 16,
    color: '#1e88e5', // Deep blue text
    marginVertical: 10,
  },
  resendButton: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  resendButtonEnabled: {
    backgroundColor: '#fbc02d', // Yellow (consistent button styling)
  },
  resendButtonDisabled: {
    backgroundColor: '#bdbdbd', // Gray for disabled state
  },
  resendTextEnabled: {
    color: '#1e88e5', // Blue text for enabled button
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendTextDisabled: {
    color: '#757575', // Gray text for disabled button
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default VerifyOTPCreatePassword;
