import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const UserManagement = () => {
  const navigation = useNavigation();

  // List of options with icons
  const items = [
    { title: 'Create User', screen: 'CreateUser', icon: 'person-add' },
    { title: 'Manage Users', screen: 'ManageUsers', icon: 'group' },
    { title: 'User Activity Log', screen: 'UserActivityLog', icon: 'timeline' },
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

export default UserManagement;

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
});
