import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bounce-9115b56f2109.herokuapp.com/', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authorization token
api.interceptors.request.use((config) => {
  // console.log('Request Object:', config)
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
