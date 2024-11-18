import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SubscriptionScreen = () => {
  const plans = [
    { title: 'Premium', price: '$12.99/month', features: ['Ad-free listening', 'Download to listen offline', 'Access full catalog Premium', 'High sound quality', 'Cancel anytime'] },
    { title: 'Standard', price: '$9.99/month', features: ['Limited ads', 'Download to listen offline', 'Access standard catalog', 'High sound quality', 'Cancel anytime'] },
    { title: 'Basic', price: '$4.99/month', features: ['Ad-supported', 'Download for offline', 'Access basic catalog', 'Standard sound quality', 'Cancel anytime'] },
  ];

  return (
    <ImageBackground
      source={require('../images/SubscriptionPlans/Image116.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.headerText1}>Unlimited</Text>
        <Text style={styles.headerText2}>music selections.</Text>
        
        {/* Horizontal Scrollable Subscription Plans */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {plans.map((plan, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{plan.title}</Text>
              <Text style={styles.price}>{plan.price}</Text>
              <View style={styles.featuresList}>
                {plan.features.map((feature, idx) => (
                  <Text key={idx} style={styles.feature}>{feature}</Text>
                ))}
              </View>
              <TouchableOpacity style={styles.subscribeButton}>
                <Text style={styles.subscribeButtonText}>Subscribe now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.icon1}>
          <Ionicons name="ellipsis-horizontal-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Back Home Button */}
        <TouchableOpacity>
          <Text style={styles.backHomeLink}>Back home</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  headerText1: { fontSize: 30, fontWeight: 'bold', color: '#fff', marginTop:70 },
  headerText2: { fontSize: 30, fontWeight: 'bold', color: '#fff', },
  scrollContainer: { flexDirection: 'row', paddingBottom: 20 },
  card: {
    marginTop:50,
    width: 300, // Card width adjusted for horizontal scrolling
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10, // Space between cards
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  icon1:{
    marginBottom:80
  },
  cardTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 24, color: '#1DB954', marginBottom: 20 },
  featuresList: { width: '100%', marginBottom: 20 },
  feature: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
  subscribeButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  subscribeButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backHomeLink: { color: '#fff', fontSize: 18, marginTop: 20,fontWeight:'bold' },
});

export default SubscriptionScreen;
