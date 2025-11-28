// react router
import { createBrowserRouter } from "react-router";

// react 
import { Suspense, lazy } from "react";

// loader
import siteDataLoader from "../routers/siteDataLoader";
import userDataLoader from "../routers/userDataLoader";
import postsDataLoader from "../routers/postsDataLoader";

// pages
const Home = lazy(() => import("../pages/home-layout/Home/Home"));
const Error = lazy(() => import("../pages/error/Error"));
const AllPosts = lazy(() => import("../pages/plog-layout/AllPosts/AllPosts"));
const SignUp = lazy(() => import("../pages/user-auth/SignUp/SignUp"));
const Login = lazy(() => import("../pages/user-auth/Login/Login"));
const About = lazy(() => import("../pages/home-layout/About/About"));
const Contact = lazy(() => import("../pages/home-layout/Contact/Contact"));
const ForgotPassword = lazy(() => import("../pages/user-auth/ForgotPassword/ForgotPassword"));
const Profile = lazy(() => import("../pages/plog-layout/profile/profile"));
const PostDetails = lazy(() => import("../pages/plog-layout/postDetails/postDetails"));
const CreatePostForm = lazy(() => import("../pages/plog-layout/CreatePostForm/CreatePostForm"));

// layouts
const HomeLayout = lazy(() => import("../layouts/homeLayout"));
const BlogLayout = lazy(() => import("../layouts/blogLayout"));

// local
import ProtectRoute from "./protectRouter";
import ProtectLogin from "./protectLogin";
import Loading from "../pages/loading/loading";

// const Loader = () => <div>Loading...</div>;

const router = createBrowserRouter([
    {
        path: "/",
        element: <Suspense fallback={<Loading />}>
            <HomeLayout />
        </Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><Home /></Suspense>,
            },
            {
                path: "home",
                element: <Suspense fallback={<Loading />}><Home /></Suspense>,
            },
            {
                path: "about",
                element: <Suspense fallback={<Loading />}><About /></Suspense>,
                loader: siteDataLoader,
            },
            {
                path: "contact",
                element: <Suspense fallback={<Loading />}><Contact /></Suspense>,
            },
        ],
    },
    {
        path: "/signUp",
        element: <Suspense fallback={<Loading />}><SignUp /></Suspense>,
        loader: userDataLoader
    },
    {
        path: "/login",
        element: <Suspense fallback={<Loading />}><ProtectLogin><Login /></ProtectLogin></Suspense>,
        loader: userDataLoader
    },
    {
        path: "/forgotPassword",
        element: <Suspense fallback={<Loading />}><ForgotPassword /></Suspense>,
        loader: userDataLoader
    },
    {
        path: "/blog",
        element: <Suspense fallback={<Loading />}><ProtectRoute><BlogLayout /></ProtectRoute></Suspense>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><AllPosts /></Suspense>,
                loader: postsDataLoader,
            },
            {
                path: "allPostsHome",
                element: <Suspense fallback={<Loading />}><AllPosts /></Suspense>,
                loader: postsDataLoader,
            },
            {
                path: "postDetails/:id",
                element: <Suspense fallback={<Loading />}><PostDetails /></Suspense>,
                loader: postsDataLoader,
            },
            {
                path: "createPost",
                element: <Suspense fallback={<Loading />}><CreatePostForm /></Suspense>,
            },
            {
                path: "profile",
                element: <Suspense fallback={<Loading />}><Profile /></Suspense>,
                loader: postsDataLoader,
            },
        ],
    },
    {
        path: "*",
        element: <Suspense fallback={<Loading />}><Error /></Suspense>,
    },
]);

export default router;
