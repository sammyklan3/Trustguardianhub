import axios from 'axios';
// import process from 'process'; // Import the 'process' module

const BASE_URL = "http://localhost:3000/api/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configuration options here
});
