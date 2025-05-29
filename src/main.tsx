import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Asegúrate de que este archivo exista y sea accesible

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
