import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import useMusicPlayer from './MusicPlayer';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MusicPlayerScreen = () => {
  const route = useRoute();
  const { nowPlaying, currentTime: initialTime, isPlaying: wasPlaying } = route.params; // Nhận bài hát hiện tại từ PlaylistScreen

  const {
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seekTo,
    playSong,
    cleanup,
    handlePreviousSong,
    handleNextSong,
    currentTrack
  } = useMusicPlayer([nowPlaying]); // Truyền bài hát hiện tại vào useMusicPlayer

  useEffect(() => {
    const setupPlayback = async () => {
      try {
        // Dừng bài hát trước đó nếu có
        await cleanup();
  
        // Phát bài hát mới
        await playSong(nowPlaying);
  
        // Seek đến thời gian đã lưu, nếu có
        if (initialTime > 0) {
          await seekTo(initialTime);
        }
  
        // Đồng bộ trạng thái phát/tạm dừng
        if (wasPlaying) {
          await togglePlayPause();
        }
      } catch (error) {
        console.error('Error setting up playback:', error);
      }
    };
  
    setupPlayback();
  }, [nowPlaying]); 
  
  
  const progress = duration > 0 ? currentTime / duration : 0;
  return (
    <ImageBackground
      source={{ uri: nowPlaying.image }}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.songTitle}>{nowPlaying.title}</Text>
        <Text style={styles.artistName}>{nowPlaying.artist}</Text>
          <View style={styles.progressContainer}>
          <Slider
            style={styles.progressBar}
            value={progress}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#555"
            thumbTintColor="#1DB954"
            onSlidingComplete={(value) => {
              const seekTime = value * duration; 
              seekTo(seekTime);
            }}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handlePreviousSong}>
            <Ionicons
            name="play-skip-back"
            size={40}
            color="#1DB954"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton} onPress={togglePlayPause}>
            <Ionicons
              name={isPlaying ? 'pause-circle' : 'play-circle'}
              size={50}
              color="#1DB954"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton} onPress={handleNextSong}>
            <Ionicons
            name="play-skip-forward" 
            size={40}
            color="#1DB954"
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  songTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 250,
    textAlign: 'center',
  },
  artistName: {
    fontSize: 20,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressBar: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    alignItems: 'center',
  paddingHorizontal: 20,
  gap: 30, // Space between buttons
  },
  controlButton: {
    // backgroundColor: '#1DB954',
    padding: 15,
    borderRadius: 50,
  },
  controlButtonText: {
    // color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default MusicPlayerScreen;