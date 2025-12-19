import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// local
import router from "./router/mainRouter.jsx";
import "./index.css";
import UserDetailsContext from "./context/userContext.jsx";

// theme
import ThemeProvider from "./context/themeContext.jsx";

// toast
import { Toaster } from "react-hot-toast";

// react router
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserDetailsContext>
            <ThemeProvider>
                <Toaster />
                <RouterProvider router={router} />
            </ThemeProvider>
        </UserDetailsContext>
    </StrictMode>
);
