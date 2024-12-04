import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeAudioListening from '../views/HomeAudioListening';
import Top50Canada from '../views/Top50Canada';
import PlayAnAudio from '../views/PlayAnAudio';
import Suggestion from '../views/Suggestion';
import TrendingAlbum from '../views/TrendingAlbum';

const Stack = createStackNavigator();

const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeAudioListening" component={HomeAudioListening} />
    <Stack.Screen name="Top50Canada" component={Top50Canada} />
    <Stack.Screen name="PlayAnAudio" component={PlayAnAudio} />
    <Stack.Screen name="Suggestion" component={Suggestion} />
    <Stack.Screen name="TrendingAlbum" component={TrendingAlbum} />
  </Stack.Navigator>
);

export default HomeStackScreen;