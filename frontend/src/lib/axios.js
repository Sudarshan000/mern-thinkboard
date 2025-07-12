import axios from 'axios';

// in production, there is nothing called as localhost, so we need to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? 'http://localhost:5000/api' : '/api';
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;