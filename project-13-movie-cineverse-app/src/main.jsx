import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// local
import router from "./router/mainRouter.jsx";
import "./index.css";
import UserDetailsContext from "./context/userContext.jsx";
import DeatilsTypeProvider from "./context/detailsType.jsx";
import ThemeProvider from "./context/themeContext.jsx";
import FavoritesProvider from "./context/favoritesContext.jsx";

// toast
import { Toaster } from "react-hot-toast";

// react router
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <UserDetailsContext>
            <ThemeProvider>
                <DeatilsTypeProvider>
                    <FavoritesProvider>
                        <Toaster />
                        <RouterProvider router={router} />
                    </FavoritesProvider>
                </DeatilsTypeProvider>
            </ThemeProvider>
        </UserDetailsContext>
    </StrictMode>
);
