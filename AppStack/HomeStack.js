import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeAudioListening from '../views/HomeAudioListening';
import PlaylistDetail from '../views/PlaylistDetail';

const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeAudioListening" component={HomeAudioListening} />
    <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
  </Stack.Navigator>
);

export default HomeStackScreen;
