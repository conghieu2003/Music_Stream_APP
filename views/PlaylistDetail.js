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
        uri: 'https://audio.jukehost.co.uk/mpSN02RCjQCE57MJNAmKUtIpa7T7qOgG', // Đảm bảo mỗi bài hát có một URL hợp lệ
      },
      {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        plays: '2.1M',
        duration: '3:36',
        image: 'https://i.ytimg.com/vi/r6yYtbv63ms/maxresdefault.jpg',
        uri: 'https://audio.jukehost.co.uk/YQz1vDsGFwAgLsuE2SxfoBWfyZeYercH', // Đảm bảo mỗi bài hát có một URL hợp lệ
      },
      {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        plays: '2.1M',
        duration: '3:36',
        image: require('../images/PlaylistDetails/Image51.png'),
        uri: 'https://example.com/flower.mp3', // Đảm bảo mỗi bài hát có một URL hợp lệ
      },
      {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        plays: '2.1M',
        duration: '3:36',
        image: require('../images/PlaylistDetails/Image51.png'),
        uri: 'https://example.com/flower.mp3', // Đảm bảo mỗi bài hát có một URL hợp lệ
      },
      {
        title: 'FLOWER',
        artist: 'Jessica Gonzalez',
        plays: '2.1M',
        duration: '3:36',
        image: require('../images/PlaylistDetails/Image51.png'),
        uri: 'https://example.com/flower.mp3', // Đảm bảo mỗi bài hát có một URL hợp lệ
      },

      // Thêm các bài hát khác tương tự...
    ],
  };

  const [nowPlaying, setNowPlaying] = useState(null);
  const progress = duration > 0 ? currentTime / duration : 0;
  // console.log('Progress:', progress, 'Current Time:', currentTime, 'Duration:', duration);
  // const [progress, setProgress] = useState(0);
  // Giá trị từ 0 đến 1

  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    playSong,
    togglePlayPause,
    handleNextSong,
    handlePreviousSong,
  } = useMusicPlayer(playlist.songs);
  

  const handlePlaySong = (song) => {
    playSong(song);
    setNowPlaying(song); // Cập nhật bài hát hiện đang phát
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
            }>{`${playlist.likes} ${playlist.duration}`}</Text>
          <Text style={styles.updated}>{playlist.updated}</Text>
        </View>
      </View>

      {/* Nút điều khiển */}
      <View style={styles.buttonHeader}>
        {/* ... Các nút điều khiển khác */}
        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
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
              <Text
                style={
                  styles.songDetail
                }>{`${song.plays} • ${song.duration}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {nowPlaying && (
        <View style={styles.nowPlaying}>
          <Image source={nowPlaying.image} style={styles.nowPlayingImage} />
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
                const seekTime = value * duration; // Tính thời gian cần seek
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
            {/* Thêm các nút chuyển bài hát */}
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
        </View>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 15, flexDirection: 'row' },
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
  songInfo: { marginLeft: 10 },
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

export default PlaylistScreen;
