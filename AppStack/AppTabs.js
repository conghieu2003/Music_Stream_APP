import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStackScreen from './HomeStack';
import FeedStackScreen from './FeedStack';
import LibraryStackScreen from './LibraryStack';
import AudioListingSearchResults from '../views/AudioListingSearchResults';

const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Home" 
      component={HomeStackScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Search" 
      component={AudioListingSearchResults} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Feed" 
      component={FeedStackScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="newspaper-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen 
      name="Library" 
      component={LibraryStackScreen} 
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="library-outline" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppTabs;
