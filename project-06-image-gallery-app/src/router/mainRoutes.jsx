// react router
import { createBrowserRouter } from "react-router";

// local
import MainPage from "../pages/mainPageLayout";
import ErrorPage from "../pages/error-page/errorPage";
import HomePage from "../pages/home-page/homePage";

const router = createBrowserRouter([
    {
        element: <MainPage />,
        errorElement: <ErrorPage />,
        path: "/",
        children: [
            {
                element: <HomePage />,
                index:true
            },
            {
                element: <HomePage />,
                path:"home"
            }
        ]
    }
])

export default router