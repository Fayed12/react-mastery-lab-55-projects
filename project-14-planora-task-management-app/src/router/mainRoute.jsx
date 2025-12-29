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

// dashboard pages
const Home = lazy(() => import("../pages/Home-Page/Home.jsx"))
const Tasks = lazy(() => import("../pages/Tasks-Page/Tasks.jsx"))
const TaskManagement = lazy(() => import("../pages/TaskManagement-Page/TaskManagement.jsx"))
const Projects = lazy(() => import("../pages/Projects-Page/Projects.jsx"))
const ProjectsManagement = lazy(() => import("../pages/ProjectsManagement-Page/ProjectsManagement.jsx"))
const Calendar = lazy(() => import("../pages/Calendar-Page/Calendar.jsx"))
const Profile = lazy(() => import("../pages/Profile-Page/Profile.jsx"))
const Statistics = lazy(()=>import("../pages/Statistics-Page/Statistics.jsx"))

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
                        <SuspenseContainer children={<DashboardLayout />} />
                    </ProtectRouter>
                ),
                children: [
                    {
                        index: true,
                        element:<Home/>
                    },
                    {
                        path:"home",
                        element:<Home/>
                    },
                    {
                        path:"tasks",
                        element: <Tasks />
                    },
                    {
                        path:"taskManagement",
                        element: <TaskManagement />
                    },
                    {
                        path:"projects",
                        element: <Projects />
                    },
                    {
                        path:"projectsManagement",
                        element: <ProjectsManagement />
                    },
                    {
                        path:"calendar",
                        element: <Calendar />
                    },
                    {
                        path:"profile",
                        element: <Profile />
                    },
                    {
                        path:"statistics",
                        element: <Statistics />
                    },
                ]
            },
        ]
    }
])

export default router;