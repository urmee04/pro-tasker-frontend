//import React and necessary hooks for state and context
import React, { useState, useContext } from "react";
//import Material-UI components for styling and layout
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
//import authentication context to access login function
import { AuthContext } from "../context/AuthContext";
//import navigation hook for programmatic routing
import { useNavigate } from "react-router-dom";

const Login = () => {
  //state for form data (email and password)
  const [formData, setFormData] = useState({ email: "", password: "" });
  //state for error messages
  const [error, setError] = useState("");
  //get login function from authentication context
  const { login } = useContext(AuthContext);
  //initialize navigate function for programmatic routing
  const navigate = useNavigate();

  //handle input changes and update form state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevent default form submission
    setError(""); //clear previous errors
    try {
      //call login function from context with form data
      await login(formData); //this handles API call and updates authentication state
      navigate("/dashboard"); //redirect to dashboard on successful login
    } catch (err) {
      console.error(err); //log error for debugging
      //set error message from server response or default message
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    //main container with maximum width for responsive design
    <Container maxWidth="sm">
      {/* Styled box with margin, padding, and shadow for card-like appearance */}
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
        {/* Form title */}
        <Typography variant="h4" gutterBottom>
          Log In
        </Typography>

        {/* Display error message if exists */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Login form */}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required //HTML5 validation
          />

          {/* Password input field */}
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required //HTML5 validation
          />

          {/* Submit button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }} //Margin top for spacing
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
