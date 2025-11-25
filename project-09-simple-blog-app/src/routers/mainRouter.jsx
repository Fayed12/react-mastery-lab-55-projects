// react router
import { createBrowserRouter } from "react-router";

// pages
import Home from "../pages/home-layout/Home/Home";
import Error from "../pages/error/Error";
import AllPosts from "../pages/allPosts/AllPosts";
import SignUp from "../pages/signUp/SignUp";
import Login from "../pages/login/Login";
import About from "../pages/home-layout/About/About";
import Contact from "../pages/home-layout/Contact/Contact";
    
// layouts
import HomeLayout from "../layouts/homeLayout";
import BlogLayout from "../layouts/blogLayout";

// local
import ProtectRoute from "./protectRouter";
import ProtectLogin from "./protectLogin";

const router = createBrowserRouter([    
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
        ],
    },
    {
        path: "/signUp",
        element: <ProtectLogin><SignUp /></ProtectLogin>,
    },
    {
        path: "/login",
        element: <ProtectLogin><Login /></ProtectLogin>,
    },
    {
        path: "/blog",
        element: <ProtectRoute><BlogLayout /></ProtectRoute>,
        children: [
            {
                index: true,
                element: <AllPosts />,
            },
        ],
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default router;
