import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeedAudioListening from '../views/FeedAudioListening';
import FeedComment from '../views/FeedComment';

const FeedStack = createStackNavigator();

const FeedStackScreen = () => (
  <FeedStack.Navigator screenOptions={{ headerShown: false }}>
    <FeedStack.Screen name="FeedAudioListening" component={FeedAudioListening} />
    <FeedStack.Screen name="FeedComment" component={FeedComment} />
  </FeedStack.Navigator>
);

export default FeedStackScreen;
