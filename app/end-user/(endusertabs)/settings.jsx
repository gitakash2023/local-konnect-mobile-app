import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Settings = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState(null);

  // Fetch user email from AsyncStorage when component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail'); // Adjust key to match where you store the email
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, []);

  // List of settings with icons
  const settingsItems = [
    { title: 'Account Information', route: '/account-info', icon: 'person' },
    { title: 'Privacy Settings', route: '/privacy-settings', icon: 'lock' },
    { title: 'Notifications', route: '/notifications', icon: 'notifications' },
    { title: 'Change Password', route: '/change-password', icon: 'vpn-key' },
  ];

  // Handle logout
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              // Clear user data from AsyncStorage
              await AsyncStorage.clear();
              console.log('User data removed from storage');

              // Navigate to Login screen and reset navigation stack
              router.replace('/login');
            } catch (error) {
              console.error('Error clearing AsyncStorage:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Display user email */}
      {userEmail && (
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>{userEmail}</Text>
        </View>
      )}

      {/* Render settings list */}
      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={() => router.push(item.route)}
        >
          <View style={styles.row}>
            <MaterialIcons name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.listText}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#888" style={styles.arrow} />
          </View>
        </TouchableOpacity>
      ))}

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.row}>
          <MaterialIcons name="logout" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  userInfo: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  userEmail: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  listItem: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  listText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  arrow: {
    marginLeft: 'auto',
  },
  logoutButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f4511e',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
