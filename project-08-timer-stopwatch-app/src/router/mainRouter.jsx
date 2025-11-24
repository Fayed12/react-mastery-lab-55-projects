// react router
import { createBrowserRouter } from "react-router";

// local
import App from "../App";
import Stopwatch from "../components/Stopwatch";
import Timer from "../components/timer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Stopwatch />,
            },
            {
                path: "stopwatch",
                element: <Stopwatch />,
            },
            {
                path: "timer",
                element: <Timer />,
            }
        ]
    }
])

export default router;
