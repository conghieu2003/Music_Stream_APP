import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const useMusicPlayer = (songs) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // Thêm state cho thời gian hiện tại
  const [duration, setDuration] = useState(0); // Thêm state cho tổng thời gian

  useEffect(() => {
  let interval;
  if (isPlaying && sound) {
    interval = setInterval(async () => {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setCurrentTime(status.positionMillis / 1000); // Thời gian hiện tại (giây)
        setDuration(status.durationMillis / 1000); // Tổng thời gian (giây)
      }
    }, 1000); // Cập nhật mỗi giây
  }
  return () => clearInterval(interval); // Xóa interval khi dừngr
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
        // setIsPlaying(false);
        if (currentIndex < songs.length - 1) {
          const nextTrack = songs[currentIndex + 1];
          await playSong(nextTrack);
        } else {
          // If it's the last song, stop playing
          setIsPlaying(false);
        }
      }
    });
  };

  const handlePreviousSong = async () => {
    if (!currentTrack) return; // Nếu chưa có bài hát nào được chọn
    const currentIndex = songs.findIndex(
      (song) => song.uri === currentTrack.uri
    );
    if (currentIndex > 0) {
      const previousTrack = songs[currentIndex - 1];
      await playSong(previousTrack); // Phát bài hát trước
    }
  };

  const handleNextSong = async () => {
    if (!currentTrack) return; // Nếu chưa có bài hát nào được chọn
    const currentIndex = songs.findIndex(
      (song) => song.uri === currentTrack.uri
    );
    if (currentIndex < songs.length - 1) {
      const nextTrack = songs[currentIndex + 1];
      await playSong(nextTrack); // Phát bài hát tiếp theo
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
      await sound.setPositionAsync(time * 1000); // Chuyển đổi sang milliseconds
    }
  };

  const playRandomSong = async () => {
    // If no songs available
    if (!songs || songs.length === 0) return;

    // Get random index, excluding current song if any
    let randomIndex;
    if (currentTrack) {
      const currentIndex = songs.findIndex(song => song.uri === currentTrack.uri);
      do {
        randomIndex = Math.floor(Math.random() * songs.length);
      } while (randomIndex === currentIndex && songs.length > 1);
    } else {
      randomIndex = Math.floor(Math.random() * songs.length);
    }

    // Play the random song
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
