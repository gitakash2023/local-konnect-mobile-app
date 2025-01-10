import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserManagement from '../super-admin-drawer/user-management/UserManagement';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from '../super-admin-drawer/home/Home';


const Drawer = createDrawerNavigator();

export default function index() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen 
        name="Home" 
        component={Home} 
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }} 
      />
      <Drawer.Screen 
        name="UserManagement" 
        component={UserManagement} 
        options={{
          drawerLabel: 'User Management',
          drawerIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }} 
      />

      
    </Drawer.Navigator>
  );
}
