import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

import "./index.css";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <AuthProvider>
          <NotificationProvider>
          <App />
          </NotificationProvider>
        </AuthProvider>
      </BrowserRouter>

    </ThemeProvider>
  </React.StrictMode>
);
