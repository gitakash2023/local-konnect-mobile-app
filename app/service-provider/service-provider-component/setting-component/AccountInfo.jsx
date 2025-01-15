import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileImage from "../setting-component/ProfilePic"

const AccountInfo = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [profileImage, setProfileImage] = useState(null); // No default image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const role = await AsyncStorage.getItem('userType');
        const image = await AsyncStorage.getItem('profileImage');

        if (email) setUserEmail(email);
        if (role) setUserRole(role);

        // Set image from AsyncStorage if it exists, otherwise null
        if (image) setProfileImage(image);
        else setProfileImage(null);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {userEmail && userRole ? (
        <>
          <Text style={styles.text}>Email: {userEmail}</Text>
          <Text style={styles.text}>Role: {userRole}</Text>
        </>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}

      {/* Profile Image Component */}
      <ProfileImage profileImage={profileImage} setProfileImage={setProfileImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default AccountInfo;
