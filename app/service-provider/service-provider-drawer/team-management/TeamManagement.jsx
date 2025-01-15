// UserManagementWithNavigation.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

// Screen Components
const CreateTeam = () => (
  <View style={styles.screenContainer}>
    <Text>Create Team Screen</Text>
  </View>
);

const ManageTeam = () => (
  <View style={styles.screenContainer}>
    <Text>Manage Team Screen</Text>
  </View>
);

const TeamActivityLog = () => (
  <View style={styles.screenContainer}>
    <Text>Team Activity Log Screen</Text>
  </View>
);

const AssignRoles = () => (
  <View style={styles.screenContainer}>
    <Text>Assign Roles & Permissions Screen</Text>
  </View>
);

// UserManagement Screen with Navigation
const UserManagement = () => {
  const navigation = useNavigation();

  const items = [
    { title: 'Create Team', screen: 'CreateTeam', icon: 'person-add' },
    { title: 'Manage Team', screen: 'ManageTeam', icon: 'group' },
    { title: 'Team Activity Log', screen: 'TeamActivityLog', icon: 'timeline' },
    { title: 'Assign Roles & Permissions', screen: 'AssignRoles', icon: 'lock' },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.listItem}
          onPress={() => navigation.navigate(item.screen)}
        >
          <View style={styles.row}>
            <MaterialIcons name={item.icon} size={24} color="#333" style={styles.icon} />
            <Text style={styles.listText}>{item.title}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#888" style={styles.arrow} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Main Navigation Component
const UserManagementWithNavigation = () => {
  return (
   
      <Stack.Navigator initialRouteName="UserManagement">
        <Stack.Screen name="UserManagement" component={UserManagement} />
        <Stack.Screen name="CreateTeam" component={CreateTeam} />
        <Stack.Screen name="ManageTeam" component={ManageTeam} />
        <Stack.Screen name="TeamActivityLog" component={TeamActivityLog} />
        <Stack.Screen name="AssignRoles" component={AssignRoles} />
      </Stack.Navigator>
    
  );
};

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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default UserManagementWithNavigation;
