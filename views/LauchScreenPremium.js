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
const WelcomeScreen = () => {
  return (
    <ImageBackground
      source={require('../images/LaunchScreenPremium/Image112.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('../images/LaunchScreen/Image33.png')}
          style={styles.logo}
        />
        <View style={styles.textSub}>
        <Text style={styles.headerText}>Wellcome to </Text>
        <Text style={styles.subText}>Premium</Text>
        </View>
        <View style={styles.button1}>
         <Ionicons
            name="ellipsis-horizontal"
            size={28}
            color='#fff'
          />
        <TouchableOpacity style={styles.button}>
          <Image source={require('../images/LaunchScreenPremium/Button14.png')} />
        </TouchableOpacity>
        </View>
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
  button1:{
    alignItems:'center',
    marginTop: 50,
  }
});

export default WelcomeScreen;
