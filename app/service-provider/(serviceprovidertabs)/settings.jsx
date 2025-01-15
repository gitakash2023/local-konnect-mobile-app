import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AccountInfo from '../service-provider-component/setting-component/AccountInfo';
import MyServices from '../service-provider-component/setting-component/MyServices';


const Stack = createStackNavigator();

// Settings Screen
const Settings = ({ navigation }) => {
  const settingsItems = [
    { title: 'Account Information', screen: 'AccountInfo' },
    { title: 'My Services', screen: 'MyServices' },
    // { title: 'Change Password', screen: 'ChangePassword' },
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
              navigation.replace('login');
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

// AppNavigator with Stack.Screen for navigation
const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Settings">
    <Stack.Screen name="Settings" component={Settings} />
    <Stack.Screen name="AccountInfo" component={AccountInfo} />
    <Stack.Screen name="MyServices" component={MyServices} />
    {/* <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
  </Stack.Navigator>
);

export default AppNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
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
