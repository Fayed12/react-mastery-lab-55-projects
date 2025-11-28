// react router
import { createBrowserRouter } from "react-router";

// loader
import siteDataLoader from "../routers/siteDataLoader";
import userDataLoader from "../routers/userDataLoader";
import postsDataLoader from "../routers/postsDataLoader";

// pages
import Home from "../pages/home-layout/Home/Home";
import Error from "../pages/error/Error";
import AllPosts from "../pages/plog-layout/AllPosts/AllPosts";
import SignUp from "../pages/user-auth/SignUp/SignUp";
import Login from "../pages/user-auth/Login/Login";
import About from "../pages/home-layout/About/About";
import Contact from "../pages/home-layout/Contact/Contact";
import ForgotPassword from "../pages/user-auth/ForgotPassword/ForgotPassword";
import Profile from "../pages/plog-layout/profile/profile";
import Settings from "../pages/plog-layout/settings/settings";
import PostDetails from "../pages/plog-layout/postDetails/postDetails";
import CreatePostForm from "../pages/plog-layout/CreatePostForm/CreatePostForm"

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
        element: <SignUp />,
        loader: userDataLoader
    },
    {
        path: "/login",
        element: <ProtectLogin><Login /></ProtectLogin>,
        loader: userDataLoader
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />,
        loader: userDataLoader
    },
    {
        path: "/blog",
        element: <ProtectRoute><BlogLayout /></ProtectRoute>,
        children: [
            {
                index: true,
                element: <AllPosts />,
                loader: postsDataLoader,
            },
            {
                path:"allPostsHome",
                element: <AllPosts />,
                loader: postsDataLoader,
            },
            {
                path:"postDetails/:id",
                element: <PostDetails />, 
                loader: postsDataLoader,
            },
            {
                path:"createPost",
                element: <CreatePostForm />,
            },
            {
                path:"profile",
                element: <Profile />,
            },
            {
                path:"settings",
                element: <Settings />,
            },
        ],
    },
    {
        path: "*",
        element: <Error />,
    },
]);

export default router;
