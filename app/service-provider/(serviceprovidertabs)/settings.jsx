import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Create a Stack Navigator
const Stack = createStackNavigator();

const Settings = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        const role = await AsyncStorage.getItem('userType');
        if (email) setUserEmail(email);
        if (role) setUserRole(role);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const settingsItems = [
    { title: 'Account Information', screen: 'AccountInfo' },
    { title: 'Privacy Settings', screen: 'PrivacySettings' },
    { title: 'Change Password', screen: 'ChangePassword' },
  ];

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
              await AsyncStorage.clear();
              navigation.navigate('login'); // Navigate to Settings screen after logout
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
      {userEmail && userRole && (
        <View style={styles.userInfo}>
          <Text style={styles.userEmail}>Email: {userEmail}</Text>
          <Text style={styles.userRole}>Role: {userRole}</Text>
        </View>
      )}

      {settingsItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.row}>
            <MaterialIcons name="settings" size={24} color="#333" style={styles.icon} />
            <Text style={styles.listText}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#888" style={styles.arrow} />
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <View style={styles.row}>
          <MaterialIcons name="logout" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AccountInfo = () => (
  <View style={styles.container}>
    <Text>Account Information Screen</Text>
  </View>
);

const PrivacySettings = () => (
  <View style={styles.container}>
    <Text>Privacy Settings Screen</Text>
  </View>
);

const ChangePassword = () => (
  <View style={styles.container}>
    <Text>Change Password Screen</Text>
  </View>
);

const AppNavigator = () => (
  
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  
);

export default AppNavigator;

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
  },
  userEmail: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listItem: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
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
