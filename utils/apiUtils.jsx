import axios from "axios";


// Function to handle API errors
const handleApiError = (error) => {
  console.error("API Error:", error);
  throw new Error("An error occurred while communicating with the API");
};

// Ensure to define the BASE_URL
export const BASE_URL = "https://job-portal-1-bdk6.onrender.com";

// Function to retrieve all posts
export const _getAll = async (endpoint) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to create a new post
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



// Function to retrieve a single post by ID
export const _getById = async (endpoint, id) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to update a post (ID passed as URL parameter)
export const _update = async (endpoint, id, postData) => {
  console.log(postData);

  try {
    const response = await axios.put(
      `${BASE_URL}${endpoint}/${id}`, // ID passed as a URL parameter
      postData, // Remaining data in the request body
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type if using FormData
        },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Function to delete a post by ID (ID passed as URL parameter)
export const _delete = async (endpoint, id) => {
  try {
    await axios.delete(`${BASE_URL}${endpoint}/${id}`); // ID passed as a URL parameter
    return true;
  } catch (error) {
    handleApiError(error);
  }
};
