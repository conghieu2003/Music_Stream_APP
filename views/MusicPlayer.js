import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useMusicPlayer = (songs) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); 
  const [duration, setDuration] = useState(0); 

  useEffect(() => {
  let interval;
  if (isPlaying && sound) {
    interval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000); 
        setDuration(status.durationMillis / 1000); 
      }
    }, 1000); 
  }
  return () => clearInterval(interval);
}, [isPlaying, sound]);


  const playSong = async (track) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound, status } = await Audio.Sound.createAsync({
      uri: track.uri,
    });

    setSound(newSound);
    setCurrentTrack(track);
    setIsPlaying(true);

    if (status.isLoaded) {
      setDuration(status.durationMillis / 1000);
      setCurrentTime(status.positionMillis / 1000);
    }

    await newSound.playAsync();

    newSound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000);
      }
      if (status.didJustFinish) {
        const currentIndex = songs.findIndex(song => song.uri === track.uri);
        if (currentIndex < songs.length - 1) {
          const nextTrack = songs[currentIndex + 1];
          await playSong(nextTrack);
        } else {
          setIsPlaying(false);
        }
      }
    });
  };

  const handlePreviousSong = async () => {
    if (!currentTrack) return; 
    const currentIndex = songs.findIndex(
      (song) => song.uri === currentTrack.uri
    );
    if (currentIndex > 0) {
      const previousTrack = songs[currentIndex - 1];
      await playSong(previousTrack); 
    }
  };

  const handleNextSong = async () => {
    if (!currentTrack) return;
    const currentIndex = songs.findIndex(
      (song) => song.uri === currentTrack.uri
    );
    if (currentIndex < songs.length - 1) {
      const nextTrack = songs[currentIndex + 1];
      await playSong(nextTrack);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const seekTo = async (time) => {
    if (sound) {
      await sound.setPositionAsync(time * 1000); 
    }
  };

  const playRandomSong = async () => {
    if (!songs || songs.length === 0) return;
    let randomIndex;
    if (currentTrack) {
      const currentIndex = songs.findIndex(song => song.uri === currentTrack.uri);
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentIndex && songs.length > 1);
    } else {
      randomIndex = Math.floor(Math.random() * songs.length);
    }
    await playSong(songs[randomIndex]);
  };

  const cleanup = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentTime(0);
        setDuration(0);
      } catch (error) {
        console.log('Cleanup error:', error);
      }
    }
  };
  return {
    isPlaying,
    currentTrack,
    playSong,
    currentTime,
    duration,
    togglePlayPause,
    seekTo,
    handleNextSong,
    handlePreviousSong,
    playRandomSong,
    cleanup,
  };
};

export default useMusicPlayer;
