/* eslint-disable react-refresh/only-export-components */
// react router
import { createBrowserRouter } from "react-router";

// react 
import { lazy, Suspense } from "react";

// normal imports
import LoadingPage from "../pages/loading-page/loadingPage";
import ErrorPage from "../pages/error-page/errorPage";
import ProtectedLogin from "./protectRouter";

// lazy imports
const App = lazy(() => import("../App"))
const SignUp = lazy(() => import("../pages/auth/signUp/signUp"))
const Login = lazy(() => import("../pages/auth/login/login"))
const ForgotPassword = lazy(()=> import("../pages/auth/forgotPassword/forgotPassword"))


// suspense component
function SuspenseContainer({children}) {
    return (
        <Suspense fallback={<LoadingPage />}>{children }</Suspense>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <SuspenseContainer children={<App />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signUp",
        element: <SuspenseContainer children={<SignUp />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element:<SuspenseContainer children={<Login/>}/>,
        errorElement:<ErrorPage/>
    },
    {
        path: "/forgotPassword",
        element:<SuspenseContainer children={<ForgotPassword/>}/>,
        errorElement:<ErrorPage/>
    },
]);

export default router;