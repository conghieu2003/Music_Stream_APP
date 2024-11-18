import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const playlists = [
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

const PlaylistScreen = (route) => {
  return (
    <View style={styles.container}>
    <View style = {styles.headerContainer}>
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
          <View style={styles.playlistItem}>
            <Image source={item.image} style={styles.playlistImage} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistCreator}>{`${item.creator} • ${item.songs}`}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    
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
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 100,
    marginTop:-3
  },
  headerContainer: {
    flexDirection: 'row'
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
  playlistSongs: {
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

});

export default PlaylistScreen;