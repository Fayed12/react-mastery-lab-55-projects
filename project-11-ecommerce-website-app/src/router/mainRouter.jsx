// react router
import { createBrowserRouter } from "react-router";

// react
import { lazy, Suspense } from "react";

// local without lazy loading
import App from "../App.jsx";
import ErrorPage from "../pages/error/error.jsx";
import Loading from "../pages/loading/loading.jsx";

// lazy loading imports
const HomePage = lazy(()=> import("../pages/home/home.jsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element:<App/> ,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><HomePage /></Suspense>,
            },
            {
                path:"home",
                element: <Suspense fallback={<Loading />}><HomePage /></Suspense>,
            }
        ]
    }
])

export default router;