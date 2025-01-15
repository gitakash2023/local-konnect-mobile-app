import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons'; // For action icons
import { Button, TextInput } from 'react-native-paper'; // Import Paper components
import { Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation

const MyServices = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [services, setServices] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedService, setSelectedService] = useState(''); // Store selected service

  useEffect(() => {
    // Load services from AsyncStorage on component mount
    const loadServices = async () => {
      try {
        const savedServices = await AsyncStorage.getItem('services');
        if (savedServices) {
          setServices(JSON.parse(savedServices));
        }
      } catch (error) {
        console.error('Error loading services from AsyncStorage:', error);
      }
    };
    loadServices();
  }, []);

  // Save service to AsyncStorage
  const saveService = async (values) => {
    const newService = {
      id: new Date().getTime().toString(),
      name: values.serviceName,
      description: values.serviceDescription,
      charge: values.visitCharge,
    };

    const updatedServices = [...services, newService];
    setServices(updatedServices);

    try {
      await AsyncStorage.setItem('services', JSON.stringify(updatedServices));
      setIsModalVisible(false); // Close modal after saving
    } catch (error) {
      console.error('Error saving service to AsyncStorage:', error);
    }
  };

  // Delete a service
  const deleteService = async (serviceId) => {
    const updatedServices = services.filter((service) => service.id !== serviceId);
    setServices(updatedServices);
    try {
      await AsyncStorage.setItem('services', JSON.stringify(updatedServices));
    } catch (error) {
      console.error('Error deleting service from AsyncStorage:', error);
    }
  };

  // Edit a service
  const editService = (serviceId) => {
    const serviceToEdit = services.find((service) => service.id === serviceId);
    setSelectedService(serviceToEdit.name);
    setIsModalVisible(true);
    setIsPreview(false); // Set edit mode to true
  };

  // Open preview mode
  const previewService = (serviceId) => {
    const serviceToPreview = services.find((service) => service.id === serviceId);
    setSelectedService(serviceToPreview.name);
    setIsModalVisible(true);
    setIsPreview(true); // Set preview mode to true
  };

  // Form Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required('Service name is required'),
    serviceDescription: Yup.string().required('Service description is required'),
    visitCharge: Yup.string().required('Visit charge is required').matches(/^\d+$/, 'Visit charge must be a number'),
  });

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => { setIsModalVisible(true); setIsPreview(false); }} style={styles.addButton}>
        Add Service
      </Button>

      {/* Modal for adding/editing service */}
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{isPreview ? 'Preview Service' : 'Add/Edit Service'}</Text>

          {/* Formik Form */}
          <Formik
            initialValues={{
              serviceName: selectedService || '',
              serviceDescription: '',
              visitCharge: '',
            }}
            validationSchema={validationSchema}
            onSubmit={saveService}
          >
            {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
              <>
                <TextInput
                  label="Service Name"
                  style={styles.input}
                  value={values.serviceName}
                  onChangeText={handleChange('serviceName')}
                  onBlur={handleBlur('serviceName')}
                  editable={!isPreview} // Disable input in preview mode
                  error={touched.serviceName && errors.serviceName}
                />
                {touched.serviceName && errors.serviceName && (
                  <Text style={styles.errorText}>{errors.serviceName}</Text>
                )}

                <TextInput
                  label="Service Description"
                  style={styles.input}
                  value={values.serviceDescription}
                  onChangeText={handleChange('serviceDescription')}
                  onBlur={handleBlur('serviceDescription')}
                  editable={!isPreview} // Disable input in preview mode
                  error={touched.serviceDescription && errors.serviceDescription}
                />
                {touched.serviceDescription && errors.serviceDescription && (
                  <Text style={styles.errorText}>{errors.serviceDescription}</Text>
                )}

                <TextInput
                  label="Visit Charge"
                  style={styles.input}
                  value={values.visitCharge}
                  onChangeText={handleChange('visitCharge')}
                  onBlur={handleBlur('visitCharge')}
                  keyboardType="numeric"
                  editable={!isPreview} // Disable input in preview mode
                  error={touched.visitCharge && errors.visitCharge}
                />
                {touched.visitCharge && errors.visitCharge && (
                  <Text style={styles.errorText}>{errors.visitCharge}</Text>
                )}

                {!isPreview && (
                  <Button mode="contained" onPress={handleSubmit} style={styles.saveButton} labelStyle={styles.saveButtonText}>
                    Save
                  </Button>
                )}
                <Button mode="text" onPress={() => setIsModalVisible(false)} color="red">
                  Cancel
                </Button>
              </>
            )}
          </Formik>
        </View>
      </Modal>

      {/* List of services */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>{item.name}</Text>
            <Text style={styles.serviceText}>{item.description}</Text>
            <Text style={styles.serviceText}>₹{item.charge}</Text>

            <View style={styles.serviceActions}>
              <TouchableOpacity onPress={() => editService(item.id)} style={styles.actionButton}>
                <FontAwesome name="edit" size={16} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => previewService(item.id)} style={styles.actionButton}>
                <FontAwesome name="eye" size={16} color="#fff" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteService(item.id)} style={styles.actionButton}>
                <FontAwesome name="trash" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default MyServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9', // Light blue background color
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#3b82f6', // Blue button color
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3b82f6', // Blue title color
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#f0f8ff', // Light navy blue background
    borderWidth: 1,
    borderColor: '#1e3a8a', // Light navy blue border
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
    color: '#333', // Text color
  },
  saveButton: {
    backgroundColor: '#1e3a8a', // Navy blue button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff', // White text color for contrast
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
