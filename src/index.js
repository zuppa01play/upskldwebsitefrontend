import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const container = document.getElementById("root");

const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    // Debug: mismatch aana component stack console-la print aagum
    onRecoverableError: (error, errorInfo) => {
      console.warn("Hydration issue:", error && error.message);
      if (errorInfo && errorInfo.componentStack) {
        console.warn("Component stack:", errorInfo.componentStack);
      }
    },
  });
} else {
  createRoot(container).render(app);
}