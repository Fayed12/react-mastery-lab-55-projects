// react router
import { createBrowserRouter } from "react-router";

// loader
import siteDataLoader from "../routers/siteDataLoader";

// pages
import Home from "../pages/home-layout/Home/Home";
import Error from "../pages/error/Error";
import AllPosts from "../pages/allPosts/AllPosts";
import SignUp from "../pages/user-auth/SignUp/SignUp";
import Login from "../pages/user-auth/Login/Login";
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
                loader: siteDataLoader,
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
