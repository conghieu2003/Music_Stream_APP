import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useMusicPlayer from './MusicPlayer';
import { useNavigation } from '@react-navigation/native';

const SuggestionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const songsData = require('../data/songs.json');
  const playlist = {
    title: 'Reflection',
    coverImage: require('../images/HomeAudioListening/Container26.png'),
    songs: songsData
    // songs: [
    //   {
    //     title: 'NGỰA Ô',
    //     artist: 'Dangrangto, TeuYungBoy, DONAL',
    //     image:'https://i.ytimg.com/vi/agBKEeKjlo4/maxresdefault.jpg',
    //     uri: 'https://audio.jukehost.co.uk/6gUhrFwnyoXSSxKK95U4tweHbrq8tXPE', 
    //   },
    //   {
    //     title: 'Love is',
    //     artist: 'Dangrangto',
    //     image: 'https://i.ytimg.com/vi/r6yYtbv63ms/maxresdefault.jpg',
    //     uri: 'https://audio.jukehost.co.uk/YQz1vDsGFwAgLsuE2SxfoBWfyZeYercH', 
    //   },
    //   {
    //     title: 'Xuân Thì',
    //     artist: 'Phan Mạnh Quỳnh',
    //     image:'https://i.ytimg.com/vi/vciMg0s-Gos/maxresdefault.jpg',
    //     uri: 'https://audio.jukehost.co.uk/5aO2F4s5k18GRagBVxp7nwG2qZGfHHUR', 
    //   },
    //   {
    //     title: 'Đừng Làm Trái Tim Anh Đau',
    //     artist: 'Sơn Tùng M-TP',
    //     image:'https://i.ytimg.com/vi/abPmZCZZrFA/maxresdefault.jpg',
    //     uri: 'https://audio.jukehost.co.uk/Im6tfU1fP8Zn7XL1Yq5xneM7YYEJtF9U', 
    //   },
    //   {
    //     title: 'Chăm Hoa',
    //     artist: 'Mono',
    //     image:'https://i.ytimg.com/vi/WCm2elbTEZQ/maxresdefault.jpg',
    //     uri: 'https://audio.jukehost.co.uk/PY3RQVIQKNDdBMmR5cFu2nOElYyg1BfC', 
    //   },
    // ],
  };

  const [nowPlaying, setNowPlaying] = useState(null);

 
 
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    playSong,
    togglePlayPause,
    handleNextSong,
    handlePreviousSong,
    seekTo,
    playRandomSong,
    cleanup,
  } = useMusicPlayer(playlist.songs);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      await cleanup();
      setNowPlaying();
    });

    return unsubscribe;
  }, [navigation, cleanup]);

  const progress = duration > 0 ? currentTime / duration : 0;

  useEffect(() => {
    if (currentTrack) {
      setNowPlaying(currentTrack);
    }
  }, [currentTrack]);

  const handlePlaySong = (song) => {
    playSong(song);
    setNowPlaying(song); // Cập nhật bài hát hiện đang phát
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={24}
            color="#000"
          />
        </TouchableOpacity>
        <Image source={playlist.coverImage} style={styles.coverImage} />
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistTitle}>{playlist.title}</Text>
        </View>
      </View>
      <View style={styles.buttonHeader}>
        <TouchableOpacity 
    style={styles.playButton} 
    onPress={async() => {
      if (!nowPlaying) {
        const randomSong = await playRandomSong();
        if (randomSong) {
          setNowPlaying(randomSong);
        }
      } else {
        togglePlayPause();
      }
    }}>
          <Ionicons
            name={isPlaying ? 'pause-circle-outline' : 'play-circle-outline'}
            size={28}
            color="#1DB954"
          />
        </TouchableOpacity>
      </View>

      {/* Danh sách bài hát */}
      <ScrollView style={styles.songList}>
        {playlist.songs.map((song, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePlaySong(song)}
            style={styles.songItem}>
            <Image source={{ uri: song.image }} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {nowPlaying && (
        <TouchableOpacity
        style={styles.nowPlaying}
        onPress={async () => {
          await cleanup();
          navigation.navigate('PlayAnAudio', { 
            nowPlaying,
            currentTime,
            isPlaying,
            duration,
           });
        }}>
          <Image source={{ uri: nowPlaying.image }} style={styles.nowPlayingImage} />
          <View style={styles.nowPlayingInfo}>
            <Text style={styles.nowPlayingTitle}>{nowPlaying.title}</Text>
            <Text style={styles.nowPlayingArtist}>{nowPlaying.artist}</Text>
            <Slider
              style={styles.progressBar}
              value={progress}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#1DB954"
              maximumTrackTintColor="#ccc"
              thumbTintColor="#1DB954"
              onSlidingComplete={(value) => {
                const seekTime = value * duration; 
                seekTo(seekTime);
              }}
            />
            <View style={styles.timeInfo}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>
          <View style={styles.controlButtons}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handlePreviousSong}>
              <Ionicons
                name="play-skip-back-outline"
                size={28}
                color="#1DB954"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={togglePlayPause}
              style={styles.playButton}>
              <Ionicons
                name={
                  isPlaying ? 'pause-circle-outline' : 'play-circle-outline'
                }
                size={36}
                color="#1DB954"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleNextSong}>
              <Ionicons
                name="play-skip-forward-outline"
                size={28}
                color="#1DB954"
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  backButton: {
    position: 'absolute',
    top: -20,
    zIndex: 1,
    padding: 10,
  },
  header: { padding: 15, flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  playlistTitle: { fontSize: 24, fontWeight: 'bold', left: '0' },
  playlistInfo: {
    marginTop: 10,
    flexDirection: 'column',
    padding: 15,
    alignItems: 'flex-start',
  },
  playlistDetail: {
    fontSize: 16,
    color: '#666',
    justifyContent: 'space-around',
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
  songImage: { width: 50, height: 50, borderRadius: 5 },
  songTitle: { fontSize: 18, fontWeight: 'bold' },
  songArtist: { fontSize: 16, color: '#666' },
  songDetail: { fontSize: 14, color: '#999' },
  playButton: { marginRight: 10 },
  songInfo: { marginLeft: 10,justifyContent: 'center' },
  nowPlaying: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  nowPlayingImage: { width: 50, height: 50, borderRadius: 5 },
  nowPlayingInfo: { flex: 1, marginLeft: 10 },
  nowPlayingTitle: { fontSize: 16, fontWeight: 'bold' },
  nowPlayingArtist: { fontSize: 14, color: '#666' },
  progressBar: { width: '100%', height: 20 },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: { fontSize: 12, color: '#666' },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  controlButton: {
    marginHorizontal: 20,
  },
});

export default SuggestionScreen;