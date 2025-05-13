// api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default API;

// Usage in components
import API from "./api";

const fetchUserData = async () => {
  try {
    const response = await API.get("/profile/");
    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
};