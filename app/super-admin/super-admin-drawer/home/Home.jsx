import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Home = () => {
  const cards = [
    { title: 'Total Users', value: '12,345' },
    { title: 'Active Services', value: '150' },
    { title: 'Pending Orders', value: '45' },
    { title: 'Completed Orders', value: '1,230' },
    { title: 'Revenue Overview', value: '$23,456' },
    { title: 'Refund Requests', value: '8' },
    { title: 'User Activity', value: 'Last login: 2 hours ago' },
    { title: 'Service Performance', value: 'Top Service: Cleaning Services' },
    { title: 'Notifications', value: '3 pending notifications' },
    { title: 'System Health', value: 'System Uptime: 99.8%' },
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
