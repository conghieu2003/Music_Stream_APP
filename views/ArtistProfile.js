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

// Import dữ liệu từ các file JSON
import songs from '../data/songs.json';
import albums from '../data/albums.json';
import fans from '../data/fans.json';

const ArtistProfile = ({ navigation }) => {

  // Hàm xử lý phát bài hát
  const handlePlaySong = (songTitle) => {
    console.log(`Playing ${songTitle}`);
  };

  // Hàm điều hướng đến profile của ca sĩ
  const handleGoToArtistProfile = (artistName) => {
    console.log(`Navigate to profile of ${artistName}`);
  };

  // Hàm xử lý khi nhấn vào album
  const handleAlbumPress = (albumTitle) => {
    console.log(`Navigating to album: ${albumTitle}`);
    // Thêm logic để điều hướng đến trang chi tiết của album
  };

  // Hàm xử lý khi nhấn vào fan
  const handleFanPress = (fanName) => {
    console.log(`Navigating to fan profile: ${fanName}`);
    // Thêm logic để điều hướng đến trang chi tiết của fan
  };

  // Hàm xử lý sự kiện khi nhấn vào dấu ba chấm
  const handleMoreAction = (songTitle) => {
    console.log(`Action for ${songTitle}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profile}>
        <Image
          source={require('../images/ArtistProfile/Image63.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Ryan Young</Text>
        <Text style={styles.followerCount}>65.1K Followers</Text>
        <View style={styles.buttons}>
          <View style={styles.leftButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.buttonText}>Follow</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20 }}>...</Text>
          </View>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social-outline" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="play-circle-outline" size={24} color="#1DB954" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Popular Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular</Text>
        {songs.map((song, index) => (
          <View key={index} style={styles.songItem}>
            <TouchableOpacity onPress={() => handlePlaySong(song.title)}>
              <Image source={song.image} style={styles.songImage} />
            </TouchableOpacity>
            <View style={styles.songInfo}>
              <TouchableOpacity onPress={() => handlePlaySong(song.title)}>
                <Text style={styles.songTitle}>{song.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleGoToArtistProfile(song.artist)}>
                <Text style={styles.songArtist}>{song.artist}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.songDuration}>{song.duration}</Text>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => handleMoreAction(song.title)}
            >
              <Text style={styles.moreButtonText}>...</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Albums Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Albums</Text>
        <ScrollView horizontal>
          {albums.map((album, index) => (
            <TouchableOpacity key={index} onPress={() => handleAlbumPress(album.title)}>
              <View style={styles.albumContainer}>
                <Image source={album.image} style={styles.albumImage} />
                <Text style={styles.albumTitle}>{album.title}</Text>
                <Text style={styles.albumArtist}>{album.artist}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Do in cupidatat aute et in officia aute laboris est Lorem est nisi
          dolor consequat...
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewMoreText}>View more</Text>
        </TouchableOpacity>
      </View>

      {/* Fans also like Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fans also like</Text>
        <ScrollView horizontal>
          {fans.map((fan, index) => (
            <TouchableOpacity key={index} onPress={() => handleFanPress(fan.name)}>
              <View style={styles.fanContainer}>
                <Image source={fan.image} style={styles.fanImage} />
                <Text style={styles.fanName}>{fan.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
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
  section: { padding: 15 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  songItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  songImage: { width: 50, height: 50, borderRadius: 5, marginRight: 10 },
  songInfo: { flex: 1 },
  songTitle: { fontSize: 16, fontWeight: '600' },
  songArtist: { fontSize: 14, color: '#666' },
  songDuration: { fontSize: 14, color: '#666', marginRight: 10 },
  moreButton: { marginLeft: 10 },
  moreButtonText: { fontSize: 20, color: '#000' },
  albumContainer: { marginRight: 15, alignItems: 'center' },
  albumImage: { width: 100, height: 100, borderRadius: 5 },
  albumTitle: { fontSize: 16, marginTop: 5 },
  albumArtist: { fontSize: 14, color: '#666' },
  aboutText: { fontSize: 16, color: '#666' },
  viewMoreText: { color: '#1DB954', marginTop: 5 },
  fanContainer: { alignItems: 'center', marginRight: 15 },
  fanImage: { width: 80, height: 80, borderRadius: 40 },
  fanName: { marginTop: 5, fontSize: 14 },
});

export default ArtistProfile;
