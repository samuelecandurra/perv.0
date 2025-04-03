import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Create root explicitly with the correct API
const root = ReactDOM.createRoot(document.getElementById("root")!)

// Render the app with explicit root mounting
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

