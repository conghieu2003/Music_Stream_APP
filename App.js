import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text } from 'react-native';
import ArtistProfile from "./views/ArtistProfile"; // Thay thế bằng tên file thực tế
import AudioListingSearchResults from "./views/AudioListingSearchResults"; 
import FeedAudioListening from "./views/FeedAudioListening"; 
import FeedComment from "./views/FeedComment";
import HomeAudioListening from "./views/HomeAudioListening" 
import MyLibrary from "./views/MyLibrary";
import MyPlaylist from "./views/MyPlaylist";
import PlaylistDetail from "./views/PlaylistDetail";
import SubscriptionPlan from "./views/SubcriptionPlan";
import PlayAnAudio from "./views/PlayAnAudio";
import LaunchScreen from "./views/LauchScreen";
import LauchScreenPremium from "./views/LauchScreenPremium";


const Tab = createBottomTabNavigator();
const FeedStack = createStackNavigator();
const LibraryStack = createStackNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeAudioListening" component={HomeAudioListening} />
    <HomeStack.Screen name="PlaylistDetail" component={PlaylistDetail} />
  </HomeStack.Navigator>
);

const DummyScreen = ({ title }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>{title}</Text>
  </View>
);

const FeedStackScreen = () => (
  <FeedStack.Navigator screenOptions={{ headerShown: false }}>
    <FeedStack.Screen name="FeedAudioListening" component={FeedAudioListening} />
    <FeedStack.Screen name="FeedComment" component={FeedComment} />
  </FeedStack.Navigator>
);
const MusicStackScreen = () => (
  <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
    <LibraryStack.Screen name="MyLibrary" component={MyLibrary} />
    <LibraryStack.Screen name="MyPlaylist" component={MyPlaylist} />
  </LibraryStack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
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
          component={MusicStackScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="library-outline" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
