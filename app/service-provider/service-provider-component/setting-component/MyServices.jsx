import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, TextInput, Button, StyleSheet } from "react-native";
import { fetchItems, createItem, updateItem, deleteItem } from "../../../../utils/apiUtils";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [visitCharge, setVisitCharge] = useState("");
  const [editServiceId, setEditServiceId] = useState(null); // Added state for editing a service

  // Fetch services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems("/api/services");
      setServices(data);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      Alert.alert("Error", "Service ID is invalid.");
      return;
    }

    Alert.alert("Delete Service", "Are you sure you want to delete this service?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            setLoading(true);
            const response = await deleteItem(`/api/services/${id}`);
            if (response.success) {
              setServices(services.filter((service) => service.id !== id));
            } else {
              Alert.alert("Error", "Failed to delete service.");
            }
          } catch (err) {
            console.error("Error deleting service:", err);
            Alert.alert("Error", "Failed to delete service.");
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  const handleAddService = async () => {
    if (!serviceName || !description || !visitCharge) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    const newService = { 
      name: serviceName, 
      description, 
      visitCharge: parseFloat(visitCharge) 
    };

    if (isNaN(newService.visitCharge)) {
      Alert.alert("Error", "Please enter a valid number for the visit charge.");
      return;
    }

    try {
      setLoading(true);
      const createdService = await createItem("/api/services", newService);
      setServices([...services, createdService]);
      setServiceName("");
      setDescription("");
      setVisitCharge("");
    } catch (err) {
      console.error("Error adding service:", err);
      Alert.alert("Error", "Failed to add service.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = async () => {
    if (!serviceName || !description || !visitCharge) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    const updatedService = { 
      name: serviceName, 
      description, 
      visitCharge: parseFloat(visitCharge) 
    };

    if (isNaN(updatedService.visitCharge)) {
      Alert.alert("Error", "Please enter a valid number for the visit charge.");
      return;
    }

    try {
      setLoading(true);
      const updatedServiceData = await updateItem(`/api/services/${editServiceId}`, updatedService);
      setServices(services.map(service => service.id === editServiceId ? updatedServiceData : service));
      setEditServiceId(null);
      setServiceName("");
      setDescription("");
      setVisitCharge("");
    } catch (err) {
      console.error("Error editing service:", err);
      Alert.alert("Error", "Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  const renderService = ({ item }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <Text style={styles.serviceDescription}>Visit Charge: {item.visitCharge}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            setServiceName(item.name);
            setDescription(item.description);
            setVisitCharge(item.visitCharge.toString());
            setEditServiceId(item.id);
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Services</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Service Name"
          value={serviceName}
          onChangeText={setServiceName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Visit Charge"
          keyboardType="numeric"
          value={visitCharge}
          onChangeText={setVisitCharge}
        />
        <Button
          title={editServiceId ? "Update Service" : "Add Service"}
          onPress={editServiceId ? handleEditService : handleAddService}
        />
      </View>

      <FlatList
        data={services}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        renderItem={renderService}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 80,
  },
  serviceItem: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#007BFF",
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: "#FF0000",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#FF0000",
    textAlign: "center",
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 12,
    paddingLeft: 8,
  },
});

export default MyServices;
