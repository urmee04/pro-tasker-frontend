//import React and necessary hooks
import React, { createContext, useState, useEffect } from "react";
//import API functions for authentication
import { loginUser, registerUser } from "../api/auth";

//create authentication context for sharing state across components
export const AuthContext = createContext();

//AuthProvider component that wraps the app to provide auth functionality
export const AuthProvider = ({ children }) => {
  //initialize user state, checking localStorage for existing session
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user"); //get user data from storage
    return raw ? JSON.parse(raw) : null; //parse if exists, otherwise null
  });

  //loading state for tracking async operations
  const [loading, setLoading] = useState(false);

  //login function; handles user authentication
  const login = async (credentials) => {
    setLoading(true); //start loading
    try {
      const res = await loginUser(credentials); //API call to login
      const { token, user } = res.data; //extract token and user data

      //store authentication data in localStorage
      localStorage.setItem("token", token); //save JWT token
      localStorage.setItem("user", JSON.stringify(user)); //save user info

      setUser(user); //update user state
      setLoading(false); //stop loading
      return res.data; //return response data
    } catch (err) {
      setLoading(false); //stop loading on error
      throw err; //re-throw error for handling in components
    }
  };

  //signup function; handles new user registration
  const signup = async (data) => {
    setLoading(true); //start loading
    try {
      const res = await registerUser(data); //API call to register
      setLoading(false); //stop loading
      return res.data; //return response data
    } catch (err) {
      setLoading(false); //stop loading on error
      throw err; //re-throw error for handling in components
    }
  };

  //logout function; clears user session
  const logout = () => {
    localStorage.removeItem("token"); //remove token from storage
    localStorage.removeItem("user"); //remove user data from storage
    setUser(null); //clear user state
  };

  //provide authentication state and methods to child components
  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
