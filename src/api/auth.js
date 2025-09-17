//import the configured axios instance from the local module
import api from "./axios";

//export a function to perform user login
//takes credentials (typically email and password) as parameter
export const loginUser = (credentials) => api.post("/users/login", credentials);

//export a function to register a new user
//takes user data (username, email, password, etc.) as parameter
export const registerUser = (data) => api.post("/users/signup", data);

//export the api instance as default for direct use if needed
export default api;
