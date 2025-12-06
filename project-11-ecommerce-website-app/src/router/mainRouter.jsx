// react router
import { createBrowserRouter } from "react-router";

// react
import { lazy, Suspense } from "react";

// local without lazy loading
import App from "../App.jsx";
import ErrorPage from "../pages/error/error.jsx";
import Loading from "../pages/loading/loading.jsx";
import LoadingSkilton from "../components/loadingSkilton/loadingSkilton.jsx";
import ProtectedCart from "./protectedCart.jsx";

// lazy loading imports
const HomePage = lazy(() => import("../pages/home/home.jsx"))
const AboutPage = lazy(() => import("../pages/about-page/aboutPage.jsx"))
const ContactPage = lazy(() => import("../pages/contact-page/contactPage.jsx"))
const CartPage = lazy(() => import("../pages/cart-page/cartPage.jsx"))
const MealDetailsPage = lazy(() => import("../pages/mealDetails-page/mealDetailsPage.jsx"))
const MenuPage = lazy(() => import("../pages/menu-page/menuPage.jsx"))
const CheckoutPage = lazy(() => import("../pages/checkout-page/checkoutPage.jsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<Loading />}><HomePage /></Suspense>,
            },
            {
                path: "home",
                element: <Suspense fallback={<Loading />}><HomePage /></Suspense>,
            },
            {
                path: "about",
                element: <Suspense fallback={<Loading />}><AboutPage /></Suspense>,
            },
            {
                path: "contact",
                element: <Suspense fallback={<Loading />}><ContactPage /></Suspense>,
            },

            {
                path: "menu",
                element: <Suspense fallback={<LoadingSkilton />}><MenuPage /></Suspense>,
            },
            {
                path: "cart",
                element: <ProtectedCart><Suspense fallback={<Loading />}><CartPage /></Suspense></ProtectedCart>,
            },
            {
                path: "mealDetails/:id",
                element: <Suspense fallback={<Loading />}><MealDetailsPage /></Suspense>,
            },
            {
                path: "checkout",
                element: <Suspense fallback={<Loading />}><CheckoutPage /></Suspense>,
            }

        ]
    }
])

export default router;