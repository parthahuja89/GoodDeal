import axios from "axios";
import Resources from '../resources.json'

const axiosApiInstance = axios.create({
  baseURL: Resources.urls.api_base_uri, 
  withCredentials: true, 
});

// Redirect to login on 401 errors (except when already on auth pages)
axiosApiInstance.interceptors.response.use(
  response => response,
  error => {
    const isUnauthorized = error.response?.status === 401;
    const authPages = ['/login', '/callback', '/'];
    const isNotOnAuthPage = !authPages.includes(window.location.pathname);
    
    if (isUnauthorized && isNotOnAuthPage) {
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export default axiosApiInstance;