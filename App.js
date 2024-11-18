import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import LoginForm from './views/LoginForm';
import AppTabs from './AppStack/AppTabs'; // Tab chính sau khi đăng nhập

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="LoginForm" component={LoginForm} />
        <Stack.Screen name="HomeTabs" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
