import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken'); // Correct key name
        const role = await AsyncStorage.getItem('userType'); // Correct key name
  
        console.log('Token:', token, 'Role:', role);

        setLoggedInUser(!!token);
        setUserRole(role?.toLowerCase() || ''); // Normalize role to lowercase
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const getRedirectPath = () => {
    switch (userRole) {
      case 'superadmin':
        return '/superadmin/(superadmintabs)';
      case 'accountant':
        return '/accountant/(accountanttabs)';
      case 'sales':
        return '/sales/(salestabs)';
      case 'customer support executive':
        return '/support/(supporttabs)';
      case 'hr':
        return '/hr/(hrtabs)';
      case 'serviceprovider':
        return '/service-provider/(serviceprovidertabs)';
      case 'serviceprovideremployee':
        return '/service-provider-employee/(serviceprovideremployeetabs)';
      default:
        return '/login'; // Default to login if role is invalid
    }
  };

  return loading ? null : (
    <Redirect href={loggedInUser ? getRedirectPath() : '/(routes)/onboarding'} />
  );
}
