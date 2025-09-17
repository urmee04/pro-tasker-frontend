//import the axios library for making HTTP requests
import axios from "axios";

//define the base URL for all API requests
const BASE_URL = import.meta.env.VITE_BASE_URL;

//create a customized axios instance with the base URL
export const api = axios.create({
  baseURL: BASE_URL, //all requests using this instance will start with this base URL
});

//add a request interceptor to automatically attach authentication tokens
api.interceptors.request.use((config) => {
  //retrieve the authentication token from localStorage
  const token = localStorage.getItem("token");

  //if a token exists, add it to the request headers
  if (token) {
    //ensure headers object exists (safety check)
    config.headers = config.headers || {};
    //add Authorization header with Bearer token format
    config.headers.Authorization = `Bearer ${token}`;
  }

  //return the modified configuration for the request to proceed
  return config;
});

//export the configured axios instance as the default export
export default api;
