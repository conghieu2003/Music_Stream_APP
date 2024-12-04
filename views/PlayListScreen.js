import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialPlaylists = [
  {
    id: '1',
    title: 'Ipsum sit nulla',
    creator: 'Ashley Scott',
    songs: 12,
    image: require('../images/MyPlaylists/Image110.png'), // Thay thế bằng đường dẫn tới ảnh của bạn
  },
  {
    id: '2',
    title: 'Occaecat aliq',
    creator: 'Jose Garcia',
    songs: 4,
    image: require('../images/MyPlaylists/Image111.png'), // Thay thế bằng đường dẫn tới ảnh của bạn
  },
];

const PlaylistScreen = ({ navigation }) => {
  const [playlists, setPlaylists] = useState(initialPlaylists);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');

  // Xử lý thêm playlist mới
  const handleAddPlaylist = () => {
    if (!newPlaylistTitle.trim()) {
      Alert.alert('Error', 'Please enter a valid playlist name.');
      return;
    }

    const newPlaylist = {
      id: (playlists.length + 1).toString(),
      title: newPlaylistTitle,
      creator: 'Unknown Creator',
      songs: 0,
      image: require('../images/MyPlaylists/Image110.png'), // Thay thế bằng đường dẫn tới ảnh mặc định
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistTitle('');
    setModalVisible(false); // Đóng modal sau khi thêm
  };

  // Chuyển đến màn hình playlist chi tiết
  const handlePlaylistPress = (playlist) => {
    navigation.navigate('PlaylistDetail', { playlist });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.likeButton}>
          <Ionicons name="chevron-back-outline" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Playlists</Text>
      </View>
      <Text style={styles.subHeader}>Your playlists</Text>
      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.playlistItem}
            onPress={() => handlePlaylistPress(item)}
          >
            <Image source={item.image} style={styles.playlistImage} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistCreator}>{`${item.creator} • ${item.songs} songs`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal nhập tên playlist */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Playlist</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter playlist name"
              value={newPlaylistTitle}
              onChangeText={setNewPlaylistTitle}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddPlaylist}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    marginLeft: 100,
  },
  headerContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 16,
  },
  playlistInfo: {
    flex: 1,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistCreator: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#000',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PlaylistScreen;
