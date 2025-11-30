// react router
import { createBrowserRouter } from "react-router";

// local
import HomePage from "../pages/home/home";
import ErrorPage from "../pages/error/error";
import RecipePage from "../pages/recipe/recipePage";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/recipe",
                element: <RecipePage />,
            },
        ],
    },
]);

export default router;
