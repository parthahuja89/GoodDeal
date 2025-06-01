import axios from "axios";
import { useNavigate } from "react-router-dom";
import Resources from '../resources.json'

const axiosApiInstance = axios.create({
  baseURL: Resources.urls.api_base_uri, 
  withCredentials: true, 
});

//Interceptor to redirect to login page in case of unauthorized error
axiosApiInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosApiInstance;


