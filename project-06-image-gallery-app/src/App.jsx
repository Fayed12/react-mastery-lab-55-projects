// react
import { useState, useEffect } from "react";

// local
import WelcomePage from "./pages/welcome-page/welcomePage";
import router from "./router/mainRoutes";

// react router
import { RouterProvider } from "react-router";

function App() {
    const [closeWelcome, setCloseWelcome] = useState(
        sessionStorage.getItem("closeWelcome") || "false"
    );

    // hide welcome page after first opening
    useEffect(() => {
        const timer = setTimeout(() => {
            setCloseWelcome("true");
            sessionStorage.setItem("closeWelcome", "true");
        }, 3200);

        return () => clearTimeout(timer);
    });
    return <>{closeWelcome == "false" ? <WelcomePage /> : <RouterProvider router={router}/>}</>;
}

export default App;
