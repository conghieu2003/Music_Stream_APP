import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import dữ liệu từ các file JSON
import songs from '../data/songs.json';
import albums from '../data/albums.json';
import fans from '../data/fans.json';

const ArtistProfile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { user } = route?.params || {};  // Nếu không có 'user', gán giá trị mặc định là một object rỗng

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  // Xử lý nút play bài hát
  const handlePlaySong = (songTitle) => {
    console.log(`Playing ${songTitle}`);
  };

  // Xử lý chuyển sang trang profile nghệ sĩ
  const handleGoToArtistProfile = (artistName) => {
    console.log(`Navigate to profile of ${artistName}`);
    navigation.navigate('ArtistProfile', { user: artistName }); // Chuyển tới profile nghệ sĩ
  };

  // Nếu dữ liệu đang tải
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1DB954" />
      </View>
    );
  }

  // Nếu không có dữ liệu người dùng
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Không thể tải dữ liệu người dùng.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        {/* Avatar của người dùng */}
        <Image source={{ uri: user.avatar }} style={styles.profileImage} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.followerCount}>{user.followers} Followers</Text>

        {/* Nút Follow và các nút điều hướng */}
        <View style={styles.buttons}>
          <View style={styles.leftButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>...</Text>
          </View>
          <View style={styles.rightButtons}>
            {/* Nút Share */}
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={24} color="#000" />
            </TouchableOpacity>

            {/* Nút Play */}
            <TouchableOpacity style={styles.iconButton} onPress={() => handlePlaySong(user.name)}>
              <Ionicons name="play-circle-outline" size={24} color="#1DB954" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Thông tin về bài hát, album */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        {/* Hiển thị các album */}
        {albums.map((album) => (
          <View key={album.id} style={styles.albumItem}>
            <Image source={{ uri: album.cover }} style={styles.albumImage} />
            <Text style={styles.albumName}>{album.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Songs</Text>
        {/* Hiển thị các bài hát */}
        {songs.map((song) => (
          <TouchableOpacity key={song.id} onPress={() => handlePlaySong(song.title)} style={styles.songItem}>
            <Text style={styles.songName}>{song.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 18, color: 'red' },
  profile: { alignItems: 'center', marginVertical: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  profileName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  followerCount: { fontSize: 18, color: '#666' },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 15,
  },
  leftButtons: { flexDirection: 'row', alignItems: 'center' },
  followButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: { color: '#fff' },
  rightButtons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginHorizontal: 5 },

  // Styles cho phần bài hát và album
  section: { marginTop: 20, paddingHorizontal: 10 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold' },
  albumItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  albumImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  albumName: { fontSize: 18 },
  songItem: { marginVertical: 5 },
  songName: { fontSize: 18, color: '#1DB954' },
});

export default ArtistProfile;
