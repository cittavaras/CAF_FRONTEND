import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const useAxiosInterceptors = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  axios.interceptors.request.use(
    async (config) => {
      const refreshToken = await new Promise((resolve) => {
        const token = localStorage.getItem('refreshToken');
        resolve(token);
      });
  
      if (refreshToken) {
        // Include the refresh token in the request headers
        config.headers['refreshToken'] = refreshToken;
      }
  
      // Add a custom property to indicate if the request is a retried request
      config.isRetry = config.isRetry || false;
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

  axios.interceptors.response.use(
    (response) => {
      // Check if the response contains a new access token
      if (response.data && response.data.newAccessToken && !response.config.isRetry) {
        const newAccessToken = response.data.newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);
  
        // Retry the original request with the new access token
        const originalRequest = response.config;
        originalRequest.headers['Authorization'] = newAccessToken;
        originalRequest.isRetry = true; // Set the isRetry flag to true
  
        // Remove the `newAccessToken` property from the response data
        delete response.data.newAccessToken;
  
        // Retry the original request
        return axios(originalRequest);
      }
      return response;
    },
    async (error) => {
      if (error.response && error.response.data.newAccessToken && !error.config.isRetry) {

        const newAccessToken = error.response.data.newAccessToken;
        localStorage.setItem('accessToken', newAccessToken);
        const refreshToken = localStorage.getItem('refreshToken');
  
        // Retry the original request with the new access token
        error.config.headers['Authorization'] = newAccessToken;
        error.config.headers['refreshToken'] = refreshToken;
        error.config.isRetry = true; // Set the isRetry flag to true
        return axios.request(error.config);
      } else if (error.response && error.response.status === 403 && error.response.data.error === 'REFRESH_TOKEN_EXPIRED') {
        // Refresh token expired, handle logout and redirect to login page
        logout();
        navigate('/');
      }
      return Promise.reject(error);
    }
  );
};

export default useAxiosInterceptors;