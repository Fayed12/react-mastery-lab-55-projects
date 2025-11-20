// react
import { useState, useEffect } from "react";

// local
import WelcomePage from "./pages/welcome-page/welcomePage";
import MainPage from "./pages/mainPageLayout";

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
    return <>{closeWelcome == "false" ? <WelcomePage /> : <MainPage />}</>;
}

export default App;
