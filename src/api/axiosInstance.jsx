import axios from 'axios';
// import process from 'process'; // Import the 'process' module

let BASE_URL = "https://chatapp-node-7db1.onrender.com/api/";

if (process.env.NODE_ENV === 'development') {
  BASE_URL = "http://localhost:3000/api/";
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // You can add other configuration options here
});
