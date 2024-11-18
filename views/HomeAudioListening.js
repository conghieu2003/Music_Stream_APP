import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ArtistProfile = ({navigation}) => {
  const user = { name: 'Ashley Scott', avatar: require('../images/HomeAudioListening/Avatar3.png') };

  const suggestions = [
    { title: 'Reflection', artist: 'Christina Aguilera', image: require('../images/HomeAudioListening/Container26.png') },
    { title: 'In The Stars', artist: 'Benson Boone', image: require('../images/HomeAudioListening/Container27.png') },
    { title: 'In The Stars', artist: 'Benson Boone', image: require('../images/HomeAudioListening/Container26.png') },
    
  ];

  const charts = [
    { title: 'Top 50 Canada', image: require('../images/HomeAudioListening/Container31.png'), name: 'Daily chart - Toppers update' },
    { title: 'Top 50 Global', image: require('../images/HomeAudioListening/Container32.png'), name: 'Daily chart - Toppers update' },
    { title: 'Top 50 Trending', image: require('../images/HomeAudioListening/Container33.png'), name: 'Daily chart - Toppers update' },
  ];

  const trendingAlbums = [
    { title: 'ME', artist: 'Jessica Gonzalez', image: require('../images/HomeAudioListening/Image45.png') },
    { title: 'Magna nost', artist: 'Brian Thomas', image: require('../images/HomeAudioListening/Image46.png') },
    { title: 'Magna nost', artist: 'Brian Thomas', image: require('../images/HomeAudioListening/Image47.png') },
  ];

  const popularArtists = [
    { name: 'Jennifer Wilson', image: require('../images/HomeAudioListening/Image39.png') },
    { name: 'Elizabeth Hall', image: require('../images/HomeAudioListening/Image40.png') },
    { name: 'Anthony', image: require('../images/HomeAudioListening/Image41.png') },
  ];
const handleImagePress = (chart) => {
    // Điều hướng sang màn hình PlaylistDetail
    navigation.navigate('PlaylistDetail', { chart: chart });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="menu" size={28} color="#000" />
        <View style={styles.rightHeader}>
          <Ionicons name="notifications-outline" size={28} color="#000" />
          <Image source={user.avatar} style={styles.avatar} />
        </View>
      </View>
      <Text style={styles.greeting}>Good morning,</Text>
      <Text style={styles.userName}>{user.name}</Text>
      <TextInput style={styles.searchBar} placeholder="Search music" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggestions for you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.item}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemOverlay}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Charts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {charts.map((chart, index) => (
            <View key={index} style={styles.chartItem}>
            <TouchableOpacity onPress={() => handleImagePress(chart)}> 
              <Image source={chart.image} style={styles.chartImage} />
              <Text style={styles.chartTitle}>{chart.title}</Text>
              <Text style={styles.chartName}>{chart.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Trending albums</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {trendingAlbums.map((album, index) => (
            <View key={index} style={styles.albumItem}>
              <Image source={album.image} style={styles.albumImage} />
              <Text style={styles.albumTitle}>{album.title}</Text>
              <Text style={styles.albumArtist}>{album.artist}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular artists</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularArtists.map((artist, index) => (
            <View key={index} style={styles.artistItem}>
              <Image source={artist.image} style={styles.artistImage} />
              <Text style={styles.artistName}>{artist.name}</Text>
              <TouchableOpacity style={styles.followButton}>
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  rightHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 10 },
  greeting: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 15 },
  userName: { fontSize: 24, fontWeight: 'bold', paddingHorizontal: 15, paddingBottom: 10 },
  searchBar: { backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, margin: 15 },
  section: { paddingVertical: 10, paddingHorizontal: 15 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  seeAll: { fontSize: 16, color: '#1DB954' },
  item: { marginRight: 10 },
  itemImage: { width: 150, height: 150, borderRadius: 10 },
  itemOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  itemTitle: { fontSize: 16, fontWeight: '600', color: '#fff' },
  itemArtist: { fontSize: 14, color: '#ccc' },
  chartItem: { marginRight: 10, alignItems: 'center' },
  chartImage: { width: 150, height: 150, borderRadius: 10 },
  chartTitle: { fontSize: 16, fontWeight: '600', marginTop: 5 },
  chartName: { fontSize: 14, color: '#666' },
  albumItem: { marginRight: 10, alignItems: 'center' },
  albumImage: { width: 150, height: 150, borderRadius: 10 },
  albumTitle: { fontSize: 16, fontWeight: '600', marginTop: 5 },
  albumArtist: { fontSize: 14, color: '#666' },
  artistItem: { marginRight: 10, alignItems: 'center' },
  artistImage: { width: 80, height: 80, borderRadius: 40 },
  artistName: { fontSize: 16, fontWeight: '600', marginTop: 5 },
  followButton: { backgroundColor: 'black', padding: 5, borderRadius: 5, marginTop: 5 },
  followButtonText: { color: '#fff' },
});

export default ArtistProfile;
