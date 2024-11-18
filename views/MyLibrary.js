import React, {useState} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    plays: '2.1M',
    duration: '3:36',
    liked: true,
    image: require('../images/MyLibrary/Image101.png'),
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Anthony Taylor',
    plays: '68M',
    duration: '3:35',
    liked: true,
    image: require('../images/MyLibrary/Image102.png'),
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'Ashley Scott',
    plays: '4 songs',
    duration: '',
    liked: false,
    image: require('../images/MyLibrary/Image103.png'),
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Anthony Taylor',
    plays: '9M',
    duration: '7:48',
    liked: true,
    image: require('../images/MyLibrary/Image104.png'),
  },
  {
    id: '5',
    title: 'Astronaut in the Ocean',
    artist: 'Pedro Moreno',
    plays: '23M',
    duration: '3:36',
    liked: true,
    image: require('../images/MyLibrary/Image105.png'),
  },
  {
    id: '6',
    title: 'Dynamite',
    artist: 'Elena Jimenez',
    plays: '10M',
    duration: '6:22',
    liked: true,
    image: require('../images/MyLibrary/Image106.png'),
  },
];

// export default function MusicLibraryScreen() {
//   const renderSongItem = ({ item }) => (
//     <View style={styles.songItem}>
//       <Image source={item.image} style={styles.songImage} />
//       <View style={styles.songInfo}>
//         <Text style={styles.songTitle}>{item.title}</Text>
//         <Text style={styles.songArtist}>{item.artist}</Text>
//         <Text style={styles.songDetails}>{`${item.plays} • ${item.duration}`}</Text>
//       </View>
//       <FontAwesome name={item.liked ? "heart" : "heart-o"} size={20} color="#00BFFF" />
//     </View>
//   );
export default function MusicLibraryScreen({navigation}) {
  const [favorites, setFavorites] = useState([]);

  const onHeartPress = (song) => {
    if (favorites.find((fav) => fav.id === song.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== song.id));
    } else {
      setFavorites([...favorites, song]);
    }
  };
const handleImagePress = (Playlists) => {
    // Điều hướng sang màn hình PlaylistDetail
    navigation.navigate('MyPlaylist', { Playlists: Playlists });
  };
  const renderSongItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <View style={styles.songItem}>
        <Image source={item.image} style={styles.songImage} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
          <Text style={styles.songDetails}>{`${item.plays} • ${item.duration}`}</Text>
        </View>
        <TouchableOpacity onPress={() => onHeartPress(item)}>
          <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={20} color="#00BFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Library</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      {/* Filter Tabs */}
    <View style={styles.tabs}>
  {['Playlists', 'New tag', 'Songs', 'Albums', 'Artists'].map((tab) => (
    <TouchableOpacity 
      key={tab} 
      style={styles.tab}
      onPress={() => {
        if (tab === 'Playlists') {
          navigation.navigate('MyPlaylist');
        }
      }}
    >
      <Text style={styles.tabText}>{tab}</Text>
    </TouchableOpacity>
  ))}
</View>


      {/* Profile Section */}
      <View style={styles.profile}>
        <Image source={require('../images/MyLibrary/Image101.png')} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Mer Watson</Text>
          <Text style={styles.profileFollowers}>1.234K Followers</Text>
        </View>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Songs List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderSongItem}
        contentContainerStyle={styles.songList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tabText: {
    fontSize: 14,
    color: '#000',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileFollowers: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#FFF',
  },
  songList: {
    paddingHorizontal: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  songInfo: {
    flex: 1,
    marginLeft: 10,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
  songDetails: {
    fontSize: 12,
    color: '#999',
  },
});
