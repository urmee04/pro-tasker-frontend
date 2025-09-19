//import React and necessary hooks for state and context management
import React, { useState, useContext } from "react";
//import Material-UI components for form styling and layout
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
//import authentication context for user state management
import { AuthContext } from "../context/AuthContext";
//import navigation hook for programmatic routing
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //state for form data with initial empty values
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //state for storing and displaying error messages
  const [error, setError] = useState("");

  //access signup function from authentication context
  const { signup } = useContext(AuthContext);

  //initialize navigate function for programmatic page navigation
  const navigate = useNavigate();

  //handle form input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission behavior
    setError(""); //clear any previous errors

    try {
      //make signup request using context function
      const { token, user } = await signup(formData);

      //save authentication token to browser's localStorage
      localStorage.setItem("token", token);

      //redirect user to dashboard after successful registration
      navigate("/dashboard");
    } catch (err) {
      //log error for debugging purposes
      console.error(err);

      //display user-friendly error message from server or generic message
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    //main container with maximum width for responsive layout
    <Container maxWidth="sm">
      {/* Styled box with margin, padding, and shadow for card-like appearance */}
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        {/* Form title */}
        <Typography variant="h4" gutterBottom>
          Sign Up
        </Typography>

        {/* Display error message if exists */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Form element with submit handler */}
        <form onSubmit={handleSubmit}>
          {/* Username input field */}
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {/* Email input field with type validation */}
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password input field with hidden text */}
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Submit button for form */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
