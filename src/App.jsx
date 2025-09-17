import React from "react";
import {
  BrowserRouter as Router, //main component to handle routing
  Routes, //container for a collection of routes
  Route, //defines a single route (path and the component to render)
  Navigate, //component to programmatically redirect the user
} from "react-router-dom";
//imports the authentication provider and context
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";

//A custom component to protect routes that require authentication.
//It acts like a gatekeeper.
function PrivateRoute({ children }) {
  //get user and loading state from the global AuthContext.
  const { user, loading } = React.useContext(AuthContext);

  //while checking for a user, show a loading message.
  if (loading) return <p>Loading...</p>;

  //if a user is logged in, render the component passed as children (e.g., Dashboard).
  //otherwise, if there's no user, redirect them to the /login page.
  return user ? children : <Navigate to="/login" />;
}

//This is the main component that sets up the entire application.
export default function App() {
  return (
    //AuthProvider makes the user's login status available to all components inside it.
    <AuthProvider>
      {/* Router enables client-side navigation, allowing page changes without a full refresh. */}
      <Router>
        {/* The Navbar will be displayed on every page. */}
        <Navbar />
        {/* The Routes component defines all the possible pages in the app. */}
        <Routes>
          {/* Route Definitions: mapping a URL path to a specific component. */}

          {/* When the user visits the root URL ("/"), immediately redirect them to "/dashboard". */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          {/* Public routes that anyone can access. */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes. Only logged-in users can access these. */}
          {/* The <PrivateRoute> component wraps the page to enforce this rule. */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* This is a dynamic route. ":id" is a placeholder for a specific project's ID. */}
          <Route
            path="/projects/:id"
            element={
              <PrivateRoute>
                <ProjectDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
