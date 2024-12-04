import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './views/UserContext'; // Import UserContext
import LoginScreen from './views/LoginScreen';
import LoginForm from './views/LoginForm';
import SignUpScreen from './views/SignUpScreen';
import AppTabs from './AppStack/AppTabs'; // Tab chính sau khi đăng nhập
import LoginWithPhone from './views/LoginWithPhone';
import ArtistProfile from './views/ArtistProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="LoginForm" component={LoginForm} />
          <Stack.Screen name="HomeTabs" component={AppTabs} />
          <Stack.Screen name="ArtistProfile" component={ArtistProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
