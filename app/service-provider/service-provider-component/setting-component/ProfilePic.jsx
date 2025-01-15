import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Alert, Text, StyleSheet, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons'; // Import Material Icons
import { _getById, _create, _delete, _update } from '../../../../utils/apiUtils'; // Import API functions

const ProfileImage = ({ profileImage, setProfileImage, userId }) => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Request media library permissions on component mount
  useEffect(() => {
    requestPermissions();
    fetchProfileImage(); // Fetch existing profile image from the backend
  }, []);

  // Request media library permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      setPermissionGranted(true);
    } else {
      Alert.alert('Permission Denied', 'You need to grant access to the gallery.');
    }
  };

  // Fetch the profile image from the API (if any)
  const fetchProfileImage = async () => {
    try {
      const data = await _getById('/api/auth/serviceprovider/profile/get-picture', userId); // Replace '/profile' with the actual endpoint
      if (data && data.profileImage) {
        setProfileImage(data.profileImage); // Set the fetched image in state
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
    }
  };

  // Function to pick an image from the gallery and set it as the profile image
  const pickImage = async () => {
    if (!permissionGranted) {
      Alert.alert('Permission Denied', 'Please grant permission to access the gallery.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      setProfileImage(uri); // Set the picked image as the profile image
      await AsyncStorage.setItem('profileImage', uri); // Save the image in AsyncStorage

      // Send the image to the backend (create or update)
      await _update('/api/auth/serviceprovider/profile/edit-picture', userId, { profileImage: uri }); // Replace '/profile' with actual endpoint
    }
  };

  // Function to remove the profile image
  const clearImage = async () => {
    Alert.alert(
      'Delete Profile Image',
      'Are you sure you want to remove your profile image?',
      [
        { text: 'Cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            setProfileImage(null); // Remove the image
            await AsyncStorage.removeItem('profileImage'); // Clear from AsyncStorage

            // Delete the image from the backend
            await _delete('/api/auth/serviceprovider/profile/delete-picture', userId); // Replace '/profile' with actual endpoint
            setIsModalVisible(false); // Close the modal when image is deleted
          },
        },
      ]
    );
  };

  // Open the modal to view the full profile image
  const openModal = () => {
    setIsModalVisible(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.imageContainer}>
      {/* If profileImage is set, show it; otherwise, show an empty rounded placeholder */}
      {profileImage ? (
        <>
          <TouchableOpacity onPress={openModal}>
            <Image source={{ uri: profileImage }} style={styles.image} />
          </TouchableOpacity>
          <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Image source={{ uri: profileImage }} style={styles.modalImage} />
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity onPress={pickImage} style={styles.editButton}>
                    <MaterialIcons name="edit" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Change</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={clearImage} style={styles.deleteButton}>
                    <MaterialIcons name="delete" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
          <Text style={styles.imageText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the image round
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75, // Makes the placeholder round
    backgroundColor: '#ddd', // Light grey background for the placeholder
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    fontSize: 40,
    color: '#333', // Color for the "+" icon
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 300,
    height: 300,
    borderRadius: 150, // Makes the image round
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5, // Add some space between the icon and text
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileImage;
