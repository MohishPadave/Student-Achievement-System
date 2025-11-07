import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error);
    console.error('📍 URL:', error.config?.url);
    console.error('📊 Status:', error.response?.status);
    console.error('📝 Response:', error.response?.data);
    console.error('🌐 Base URL:', axiosInstance.defaults.baseURL);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Log the base URL on initialization
console.log('🔧 Axios Base URL:', axiosInstance.defaults.baseURL);
console.log('🔧 VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);

export default axiosInstance;