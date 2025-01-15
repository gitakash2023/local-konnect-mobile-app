import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';

const services = [
  { id: 1, name: 'Plumbing', type: 'Home Services' },
  { id: 2, name: 'Electrical Repairs', type: 'Home Services' },
  { id: 3, name: 'AC Repair', type: 'Home Services' },
  { id: 10, name: 'Cleaning', type: 'Home Services' },
];

const ServiceCategories = () => {
  const [selectedServices, setSelectedServices] = useState([]);

  const toggleService = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.groupTitle}>Home Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Checkbox
              status={selectedServices.includes(item.id) ? 'checked' : 'unchecked'}
              onPress={() => toggleService(item.id)}
              color="#007BFF"
            />
            <Text style={styles.serviceText}>{item.name}</Text>
          </View>
        )}
      />
      <Button mode="contained" onPress={() => console.log(selectedServices)}>
        Submit
      </Button>
    </View>
  );
};

export default ServiceCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
