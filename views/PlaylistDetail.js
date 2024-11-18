import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaylistScreen = ({ route }) => {
  const { chart } = route.params;
  const playlist = {
    title: 'Top 50 - Canada',
    likes: '1,234',
    duration: '05:10:18',
    updated: 'Daily chart - Toppers update',
    coverImage: require('../images/PlaylistDetails/Image50.png'),
    songs: [
      {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        plays: '2.1M',
        duration: '3:36',
        image: require('../images/PlaylistDetails/Image51.png'),
      },
      {
        title: 'Shape of You',
        artist: 'Anthony Taylor',
        plays: '68M',
        duration: '3:35',
        image: require('../images/PlaylistDetails/Image52.png'),
      },
      {
        title: 'Blinding Lights',
        artist: 'Brian Bailey',
        plays: '93M',
        duration: '4:39',
        image: require('../images/PlaylistDetails/Image53.png'),
      },
      {
        title: 'Levitating',
        artist: 'Anthony Taylor',
        plays: '9M',
        duration: '7:48',
        image: require('../images/PlaylistDetails/Image54.png'),
      },
      {
        title: 'Astronaut in the Ocean',
        artist: 'Pedro Moreno',
        plays: '23M',
        duration: '3:36',
        image: require('../images/PlaylistDetails/Image55.png'),
      },
      {
        title: 'Dynamite',
        artist: 'Elena Jimenez',
        plays: '10M',
        duration: '6:22',
        image: require('../images/PlaylistDetails/Image56.png'),
      },
    ],
  };

  const currentSong = {
    title: 'FLOWER',
    artist: 'Jessica Gonzalez',
    image: require('../images/PlaylistDetails/Image57.png'),
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={playlist.coverImage} style={styles.coverImage} />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>{playlist.title}</Text>
          <Text
            style={
              styles.playlistDetail
            }>{`${playlist.likes} • ${playlist.duration}`}</Text>
          <Text style={styles.updated}>{playlist.updated}</Text>
        </View>
      </View>
      <View style={styles.buttonHeader}>
        <TouchableOpacity style={styles.controlButton1}>
          <Ionicons name="heart-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton2}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={28}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton3}>
          <Ionicons name="shuffle-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton4}>
          <Image
            source={require('../images/PlaylistDetails/IconButton2.png')}
          />
        </TouchableOpacity>
      </View>
      {/* Danh sách bài hát */}
      <ScrollView style={styles.songList}>
        {playlist.songs.map((song, index) => (
          <View key={index} style={styles.songItem}>
            <Image source={song.image} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
              <Text
                style={
                  styles.songDetail
                }>{`${song.plays} • ${song.duration}`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Thanh điều khiển phát nhạc */}
      <View style={styles.currentSongBar}>
        <Image source={currentSong.image} style={styles.currentSongImage} />
        <View style={styles.currentSongInfo}>
          <Text style={styles.currentSongTitle}>{currentSong.title}</Text>
          <Text style={styles.currentSongArtist}>{currentSong.artist}</Text>
        </View>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play-circle-outline" size={28} color="#1DB954" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {padding: 15, flexDirection: 'row',  },
  playlistTitle: { fontSize: 24, fontWeight: 'bold', left: '0' },
  playlistInfo: { marginTop: 10, flexDirection: 'column', padding:15, alignItems:'flex-start' },
  playlistDetail: {
    fontSize: 16,
    color: '#666',
    justifyContent:'space-around'
  },
  updated: { fontSize: 16, color: '#666' },
  songList: { marginTop: 10 },
  songItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  },
  buttonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  songTitle: { fontSize: 18, fontWeight: 'bold' },
  songArtist: { fontSize: 16, color: '#666' },
  songDetail: { fontSize: 14, color: '#999' },
  currentSongBar: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  controlButton1: {
    marginLeft: -40,
  },
  controlButton2: {
    marginLeft: -100,
  },
  controlButton3: {
    marginRight: -110,
  },
  controlButton4: {
    marginRight: -40,
  },
  currentSongTitle: { fontSize: 16, fontWeight: 'bold' },
  currentSongArtist: { fontSize: 14, color: '#666' },
  likeButton: { marginRight: 10 },
  playButton: { marginRight: 10 },
  songInfo: { marginLeft: 10 },
});

export default PlaylistScreen;
