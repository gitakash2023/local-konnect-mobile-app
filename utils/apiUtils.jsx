// Updated API Utils with Token Handling
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error);
  throw new Error("An error occurred while communicating with the API");
};

// Base URL for the API
export const BASE_URL = "https://localkonnectbackend.onrender.com";




export const _create = async (endpoint, postData) => {
  try {
    console.log("Sending request to:", `${BASE_URL}${endpoint}`);
    const response = await axios.post(`${BASE_URL}${endpoint}`, postData);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};


// Generic API request handler
const apiRequest = async (method, endpoint, id = '', data = null) => {
  try {
    const token = await getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};  // Add 'Bearer' before the token
    const url = id ? `${BASE_URL}${endpoint}/${id}` : `${BASE_URL}${endpoint}`;
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error.response ? error.response.data : error.message;
  }
};

// CRUD operations
export const fetchItems = (endpoint, id = '') => apiRequest('GET', endpoint, id);
export const createItem = (endpoint, data) => apiRequest('POST', endpoint, '', data);
export const updateItem = (endpoint, id, data) => apiRequest('PUT', endpoint, id, data);
export const deleteItem = (endpoint, id) => apiRequest('DELETE', endpoint, id);