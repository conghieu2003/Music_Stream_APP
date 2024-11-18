import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';

const MusicPlayerScreen = () => {
  return (
    <ImageBackground
      source={require('../images/PlayAnAudio/Image58.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.time}>9:41</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="wifi" size={20} color="#fff" />
          <Ionicons name="battery-full" size={20} color="#fff" />
        </View>
        <Text style={styles.songTitle}>FLOWER</Text>
        <Text style={styles.artistName}>Jessica Gonzalez</Text>
        <Image
          source={require('../images/PlayAnAudio/Group4.png')}
          style={styles.waveform}
        />
        <View style={styles.progressBarContainer}>
          <Text style={styles.currentTime}>0:06</Text>
          <View style={styles.progressBar}>
            <View style={styles.progress} />
          </View>
          <Text style={styles.totalTime}>3:08</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton1}>
            <Ionicons name="shuffle-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton1}>
            <Ionicons name="play-skip-back-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Image source={require('../images/PlayAnAudio/IconButton3.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton2}>
            <Ionicons name="play-skip-forward-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton3}>
            <Ionicons name="ellipsis-horizontal-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.controlButton4}>
            <Ionicons name="heart-outline" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.controlButtonText1}>12K</Text>
          <TouchableOpacity style={styles.controlButton5}>
            <Ionicons
              name="chatbox-ellipses-outline"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
          <Text style={styles.controlButtonText2}>450</Text>
          <TouchableOpacity style={styles.controlButton6}>
            <Ionicons name="share-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover', justifyContent: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 20,
  },
  time: {
    color: '#fff',
    fontSize: 20,
    position: 'absolute',
    top: 10,
    left: 20,
  },
  statusIcons: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  songTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 250 },
  artistName: { fontSize: 20, color: '#ccc' },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  currentTime: { color: '#fff', fontSize: 14 },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#555',
    borderRadius: 2.5,
    marginHorizontal: 10,
  },
  progress: {
    width: '20%',
    height: '100%',
    backgroundColor: '#1DB954',
    borderRadius: 2.5,
  },
  totalTime: { color: '#fff', fontSize: 14 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  bottom:{
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: -250
  },
  controlButton5: { alignItems: 'center', padding:40 },
  controlButtonText1: { color: '#fff', fontSize: 12, padding: 10 },
  controlButtonText2: { color: '#fff', fontSize: 12,marginLeft:-30 },
  controlButton6: { alignItems: 'center', marginLeft:150 },
  waveform: { width: '100%', height: 80, resizeMode: 'contain', marginTop: 20 },
});

export default MusicPlayerScreen;
