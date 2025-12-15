import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// theme
import ThemeProvider from "./context/themeContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <Toaster />
            <App />
        </ThemeProvider>
    </StrictMode>
);
