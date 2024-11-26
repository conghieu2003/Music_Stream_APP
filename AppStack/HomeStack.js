import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeAudioListening from '../views/HomeAudioListening';
import Top50Canada from '../views/Top50Canada';

const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeAudioListening" component={HomeAudioListening} />
    <Stack.Screen name="Top50Canada" component={Top50Canada} />
  </Stack.Navigator>
);

export default HomeStackScreen;
