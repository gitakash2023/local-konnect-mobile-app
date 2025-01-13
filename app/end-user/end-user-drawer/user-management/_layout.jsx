import { Stack } from 'expo-router';

export default function UserManagementLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200ea',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="CreateUser" options={{ title: 'Create User' }} />
      {/* <Stack.Screen name="manage-users" options={{ title: 'Manage Users' }} />
      <Stack.Screen name="user-activity-log" options={{ title: 'User Activity Log' }} />
      <Stack.Screen name="assign-roles" options={{ title: 'Assign Roles & Permissions' }} /> */}
    </Stack>
  );
}
