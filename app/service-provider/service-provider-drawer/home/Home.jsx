import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Home = () => {
  const cards = [
    { title: 'Total Services Offered', value: '25' },
    { title: 'Active Bookings', value: '8' },
    { title: 'Completed Services', value: '145' },
    { title: 'Earnings This Month', value: '$4,230' },
    { title: 'New Messages', value: '5' },
    { title: 'Service Ratings', value: '4.8/5' },
    { title: 'Pending Tasks', value: '3' },
    { title: 'Top Service', value: 'Home Cleaning' },
    { title: 'Availability Status', value: 'Online' },
    { title: 'Service Requests', value: '2 new requests' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {cards.map((card, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardValue}>{card.value}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007BFF',
  },
});
