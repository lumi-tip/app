import axios from 'axios';
import { log } from './utils/logging';

const axiosInstance = axios.create();
const activeRequests = []; // Array to store CancelToken instances

axiosInstance.interceptors.request.use((config) => {
  const cancelTokenSource = axios.CancelToken.source(); // store the CancelToken instance
  activeRequests.push(cancelTokenSource);

  return {
    ...config,
    cancelToken: cancelTokenSource.token,
  };
});

axiosInstance.interceptors.response.use(
  (response) => response, // Return the response as is for successful requests
  (error) => {
    if (error.response) {
      // If the server responded with a status code outside 2xx
      return error.response; // Reject with error response instead of the whole error object
    }
    return error; // Handle cases where no response was received
  },
);

// Function to manually cancel the request in progress
export const cancelAllCurrentRequests = (message = 'All request was canceled') => {
  try {
    if (activeRequests && activeRequests.length > 0) {
      log(message);
      activeRequests.forEach((source) => {
        source.cancel(message);
      });

      activeRequests.length = 0; // Clean the CancelToken instances array
    }
  } catch (error) {
    console.error('All requests canceled:', error.message);
  }
};

export const cancelCurrentRequest = (message = 'Last request was canceled') => {
  try {
    if (activeRequests && activeRequests.length > 0) {
      log(message);
      activeRequests[activeRequests.length - 1].cancel(message);
      activeRequests.pop(); // Remove the last CancelToken instance from the array
    }
  } catch (error) {
    console.error('Last request canceled:', error.message);
  }
};

export const cancelRequestsOnBeforeUnload = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      cancelAllCurrentRequests();
    });
  }
};

export default axiosInstance;
