import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';

// Dữ liệu mẫu
const data = [
  // Tracks
  {
    id: '1',
    title: 'Dynamite',
    artist: 'Ryan Young',
    duration: '06:22',
    image: require('../images/SearchResults/Image83.png'),
    type: 'tracks',
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    duration: '04:24',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    duration: '03:20',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '4',
    title: 'Levitating',
    artist: 'Dua Lipa',
    duration: '03:23',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '5',
    title: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    duration: '02:21',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '6',
    title: 'Bad Habits',
    artist: 'Ed Sheeran',
    duration: '03:51',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '7',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    duration: '02:58',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '8',
    title: 'Peaches',
    artist: 'Justin Bieber ft. Daniel Caesar & Giveon',
    duration: '03:18',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '9',
    title: 'Montero (Call Me By Your Name)',
    artist: 'Lil Nas X',
    duration: '02:17',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '10',
    title: 'Kiss Me More',
    artist: 'Doja Cat ft. SZA',
    duration: '03:28',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '11',
    title: 'Industry Baby',
    artist: 'Lil Nas X & Jack Harlow',
    duration: '03:32',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },
  {
    id: '12',
    title: 'Leave The Door Open',
    artist: 'Bruno Mars & Anderson .Paak',
    duration: '04:05',
    image: require('../images/ArtistProfile/Image70.png'),
    type: 'tracks',
  },

  // Albums
  {
    id: '13',
    title: 'Justice',
    artist: 'Justin Bieber',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '14',
    title: 'Future Nostalgia',
    artist: 'Dua Lipa',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '15',
    title: 'Happier Than Ever',
    artist: 'Billie Eilish',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '16',
    title: 'Montero',
    artist: 'Lil Nas X',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '17',
    title: 'Certified Lover Boy',
    artist: 'Drake',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '18',
    title: 'Evermore',
    artist: 'Taylor Swift',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '19',
    title: 'Positions',
    artist: 'Ariana Grande',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '20',
    title: 'No.6 Collaborations Project',
    artist: 'Ed Sheeran',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '21',
    title: 'The After Hours',
    artist: 'The Weeknd',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '22',
    title: 'Life Support',
    artist: 'Madison Beer',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '23',
    title: 'When We All Fall Asleep, Where Do We Go?',
    artist: 'Billie Eilish',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },
  {
    id: '24',
    title: 'Plastic Hearts',
    artist: 'Miley Cyrus',
    image: require('../images/ArtistProfile/Image71.png'),
    type: 'albums',
  },

  // Profiles (Artists)
  {
    id: '25',
    name: 'Ed Sheeran',
    followers: '100M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '26',
    name: 'Dua Lipa',
    followers: '60M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '27',
    name: 'Billie Eilish',
    followers: '90M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '28',
    name: 'The Weeknd',
    followers: '80M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '29',
    name: 'Justin Bieber',
    followers: '70M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '30',
    name: 'Ariana Grande',
    followers: '60M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '31',
    name: 'Taylor Swift',
    followers: '90M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '32',
    name: 'Drake',
    followers: '75M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '33',
    name: 'Olivia Rodrigo',
    followers: '50M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '34',
    name: 'Lil Nas X',
    followers: '30M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '35',
    name: 'Sia',
    followers: '40M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
  {
    id: '36',
    name: 'Miley Cyrus',
    followers: '20M',
    image: require('../images/ArtistProfile/Image72.png'),
    type: 'artists',
  },
];

const AudioListingSearchResults = () => {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (text) => {
    const newData = data.filter((item) => {
      const itemData = item.type === 'artists'
        ? item.name.toUpperCase()
        : `${item.title.toUpperCase()} ${item.artist.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData) && (selectedType === 'All' || item.type === selectedType.toLowerCase());
    });
    setFilteredData(newData);
    setSearch(text);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    const filteredByType = data.filter((item) =>
      (type === 'All' || item.type === type.toLowerCase()) &&
      (search === '' || (item.type === 'artists'
        ? item.name.toUpperCase().includes(search.toUpperCase())
        : `${item.title.toUpperCase()} ${item.artist.toUpperCase()}`.includes(search.toUpperCase())))
    );
    setFilteredData(filteredByType);
  };

  const types = ['All', 'Tracks', 'Albums', 'Artists'];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />
      <View style={styles.typeContainer}>
        {types.map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.typeButton, selectedType === type && styles.selectedType]}
            onPress={() => handleTypeSelect(type)}
          >
            <Text style={styles.typeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            {item.type === 'tracks' ? (
              <View style={styles.trackContainer}>
                <Image source={item.image} style={styles.trackImage} />
                <View style={styles.trackDetails}>
                  <Text style={styles.trackTitle}>{item.title}</Text>
                  <Text style={styles.trackArtist}>{item.artist}</Text>
                  <Text style={styles.trackDuration}>{item.duration}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>⋮</Text>
                </TouchableOpacity>
              </View>
            ) : item.type === 'albums' ? (
              <View style={styles.albumContainer}>
                <Image source={item.image} style={styles.albumImage} />
                <View style={styles.albumDetails}>
                  <Text style={styles.albumTitle}>{item.title}</Text>
                  <Text style={styles.albumArtist}>{item.artist}</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>⋮</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.artistContainer}>
                <Image source={item.image} style={styles.artistImage} />
                <View style={styles.artistDetails}>
                  <Text style={styles.artistName}>{item.name}</Text>
                  <Text style={styles.artistFollowers}>{item.followers} followers</Text>
                </View>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.actionText}>⋮</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  typeButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  selectedType: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  typeText: {
    fontWeight: 'bold',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  artistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trackImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  artistImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  trackDetails: {
    flex: 1,
  },
  albumDetails: {
    flex: 1,
  },
  artistDetails: {
    flex: 1,
  },
  actionButton: {
    padding: 10,
  },
  actionText: {
    fontSize: 18,
  },
  trackTitle: {
    fontWeight: 'bold',
  },
  trackArtist: {
    color: '#666',
  },
  trackDuration: {
    color: '#666',
  },
  albumTitle: {
    fontWeight: 'bold',
  },
  albumArtist: {
    color: '#666',
  },
  artistName: {
    fontWeight: 'bold',
  },
  artistFollowers: {
    color: '#666',
  },
});

export default AudioListingSearchResults;