import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Home from "../service-provider-drawer/home/Home"
import UserManagement from "../service-provider-drawer/team-management/TeamManagement"



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
          drawerLabel: 'Team Management',
          drawerIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }} 
      />

      
    </Drawer.Navigator>
  );
}
