// react router
import { createBrowserRouter } from "react-router";

// react
import { lazy, Suspense } from "react";

// normal imports
import Loading from "../pages/Loading-Page/Loading"
import ErrorPage from "../pages/Error-Page/Error"
import ProtectRouter from "./protectRouter"

// lazy imports
const App = lazy(()=>import("../App.jsx"))
const LandingPage = lazy(() => import("../pages/Landing-Page/Landing"))
const Login = lazy(()=>import("../pages/authentication/Login-Page/Login"))
const Register = lazy(() => import("../pages/authentication/Register-Page/Register"))
const ForgotPassword = lazy(() => import("../pages/authentication/ForgotPassword-Page/ForgotPassword"))
const DashboardLayout = lazy(() => import("../layouts/dashboard-layout/DashboardLayout"))

// eslint-disable-next-line react-refresh/only-export-components
function SuspenseContainer({children}) {
    return (
        <>
        <Suspense fallback={<Loading/>}>{children} </Suspense>
        </>
    )
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <SuspenseContainer children={<App />} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "/home",
                element: <LandingPage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgotPassword",
                element: <ForgotPassword />,
            },
            {
                path: "/dashboard",
                element: (
                    <ProtectRouter>
                        <DashboardLayout />
                    </ProtectRouter>
                ),
            },
        ]
    }
])

export default router;