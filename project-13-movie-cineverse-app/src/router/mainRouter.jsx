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
const HomePage = lazy(() => import("../pages/home-page/homePage"));
const MoviesPage = lazy(() => import("../pages/movies-page/moviesPage"))
const MovieDetails = lazy(()=>import("../pages/movieDetails-page/movieDetails"))
const TvPage = lazy(() => import("../pages/tv-page/tvPage"))
const TvDetailsPage = lazy (()=>import ("../pages/tvDetails-page/tvDetailsPage"))
const SearchMovies = lazy(() => import("../pages/search-page/searchMovie"))
const FavoritePage = lazy(() => import("../pages/favorite-page/favoritePage"))
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
        element: (
            <ProtectedLogin>
                <SuspenseContainer children={<App />} />
            </ProtectedLogin>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <SuspenseContainer children={<HomePage />} />,
            },
            {
                path: "home",
                element: <SuspenseContainer children={<HomePage />} />,
            },
            {
                path: "movies",
                element: <SuspenseContainer children={<MoviesPage />} />,
                children: [
                    {
                        path: "movieDetails/:id",
                        element: (
                            <SuspenseContainer children={<MovieDetails />} />
                        ),
                    },
                ],
            },
            {
                path: "tvs",
                element: <SuspenseContainer children={<TvPage />} />,
                children: [
                    {
                        path: "tvDetails/:id",
                        element: (
                            <SuspenseContainer children={<TvDetailsPage />} />
                        ),
                    },
                ],
            },
            {
                path: "search",
                element: <SuspenseContainer children={<SearchMovies />} />,
            },
            {
                path: "favorite",
                element: <SuspenseContainer children={<FavoritePage />} />,
            },
        ],
    },
    {
        path: "/signUp",
        element: <SuspenseContainer children={<SignUp />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <SuspenseContainer children={<Login />} />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/forgotPassword",
        element: <SuspenseContainer children={<ForgotPassword />} />,
        errorElement: <ErrorPage />,
    },
]);

export default router;