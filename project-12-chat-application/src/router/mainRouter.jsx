// react router
import { createBrowserRouter } from "react-router";

// react 
import { lazy, Suspense } from "react";

// local
import Loading from "../pages/loading/loading"
import ErrorPage from "../pages/error/errorPage"
import ProtectedRoute from "./protecteRoute.jsx";

// pages
const Login = lazy(() => import("../pages/Authentication/Login/Login"));
const Register = lazy(() => import("../pages/Authentication/Signup/Signup"));
const ForgotPassword = lazy(()=>import("../pages/Authentication/forgotPassword/forgotPassword.jsx"))
const App = lazy(()=>import("../App.jsx"))
const HomeChats = lazy(() => import("../pages/Home-chats/Home"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const ContactUs = lazy(() => import("../pages/ContactUs/ContactUs"))
const ExploreApp = lazy(()=>import("../pages/explore-app/exploreApp.jsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><App/></ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element:<Suspense fallback={<Loading/>}><HomeChats/></Suspense>
            },
            {
                path:"homeChats",
                element:<Suspense fallback={<Loading/>}><HomeChats/></Suspense>
            },
            {
                path:"profile",
                element:<Suspense fallback={<Loading/>}><Profile/></Suspense>
            },
            {
                path:"contactUs",
                element:<Suspense fallback={<Loading/>}><ContactUs/></Suspense>
            },
            {
                path:"exploreApp",
                element:<Suspense fallback={<Loading/>}><ExploreApp/></Suspense>
            }
        ]
    },
    {
        path:"/login",
        element:<Suspense fallback={<Loading/>}><Login/></Suspense>
    },
    {
        path:"/register",
        element:<Suspense fallback={<Loading/>}><Register/></Suspense>
    },
    {
        path:"/forgotPassword",
        element:<Suspense fallback={<Loading/>}><ForgotPassword/></Suspense>
    }
])

export default router;