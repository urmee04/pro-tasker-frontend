import React from "react";
//import ReactDOM's createRoot for concurrent mode rendering
import { createRoot } from "react-dom/client";
//import the main App component
import App from "./App";
//import Material-UI's CSS baseline component for consistent styling
import CssBaseline from "@mui/material/CssBaseline";
//import Material-UI's theme provider and creation utilities
import { ThemeProvider, createTheme } from "@mui/material/styles";

//create a default Material-UI theme instance
//this provides the design system (colors, typography, spacing etc.)
const theme = createTheme();

//use createRoot to enable React 18's concurrent features
//get the DOM element with ID 'root' where the app will be mounted
createRoot(document.getElementById("root")).render(
  //react.StrictMode helps identify potential problems during development
  //it performs additional checks and warnings for its descendants
  <React.StrictMode>
    {/* ThemeProvider makes the Material-UI theme available to all child components */}
    {/* this allows consistent styling throughout the application */}
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides consistent CSS defaults across browsers */}
      {/* it normalizes styles and establishes a clean baseline */}
      <CssBaseline />
      {/* render the main App component (the root of the application) */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
