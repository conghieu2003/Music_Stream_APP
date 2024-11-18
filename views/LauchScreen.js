import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';

const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require('../images/LaunchScreen/Image30.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../images/LaunchScreen/Image33.png')}
          style={styles.logo}
        />
        <View style={styles.textSub}>
        <Text style={styles.headerText}>Your music </Text>
        <Text style={styles.subText}>Your</Text>
        <Text style={styles.subText}>artist</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../images/LaunchScreen/Group3.png')} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: { width: 100, height: 100, marginBottom: -70 },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  textSub:{
marginTop:300
  },
  subText: {
    fontWeight:'bold',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    marginTop:50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
});

export default WelcomeScreen;
