import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyLibrary from '../views/MyLibrary';
import MyPlaylist from '../views/MyPlaylist';

const LibraryStack = createStackNavigator();

const LibraryStackScreen = () => (
  <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
    <LibraryStack.Screen name="MyLibrary" component={MyLibrary} />
    <LibraryStack.Screen name="MyPlaylist" component={MyPlaylist} />
  </LibraryStack.Navigator>
);

export default LibraryStackScreen;
