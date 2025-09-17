//import React and necessary hooks
import React, { useContext } from "react";
//import Material-UI components for styling and layout
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import authentication context to access user state and logout function
import { AuthContext } from "../context/AuthContext";
//import navigation hook for programmatic routing
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Navbar() {
  //access user authentication state and logout function from context
  const { user, logout } = useContext(AuthContext);
  //initialize navigate function for programmatic routing
  const navigate = useNavigate();

  //handle logout process(call logout function and redirect to login page)
  const handleLogout = () => {
    logout(); //clear user data from context and localStorage
    navigate("/login"); //redirect to login page
  };

  return (
    //main app bar component that stays at top of page
    <AppBar position="static">
      {/* Container for navbar content with built-in padding and spacing */}
      <Toolbar>
        {/* Box container that grows to push other elements to the right */}
        <Box sx={{ flexGrow: 1 }}>
          {/* Application brand/logo text that is clickable */}
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")} //navigate to dashboard on click
          >
            Taskmaster
          </Typography>
        </Box>

        {/* Conditional rendering based on user authentication status */}
        {user ? (
          //display when user is logged in
          <>
            {/* Show username with right margin for spacing */}
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user.username}
            </Typography>
            {/* Logout button that triggers handleLogout function */}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          //display when user is not logged in
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
