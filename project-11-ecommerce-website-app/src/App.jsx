// react router
import { Outlet } from "react-router";

// local
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";
import WelcomePage from "./pages/welcome/welcome"

// react
import { useEffect, useState } from "react";

function App() {
    const [openWelcome, setOpenWelcome] = useState(() => {
        const open = sessionStorage.getItem("welcome");
        if (open) {
            return open === "true";
        }
        return true;
    });

    useEffect(() => {
        setTimeout(() => {
            setOpenWelcome(false);
            sessionStorage.setItem("welcome", "false");
        }, 8000);
    }, []);
    if (openWelcome) {
        return <WelcomePage />;
    }
    return (
        <div className="all-page">
            <nav>
                <NavBar />
            </nav>
            <main className="main-page">
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default App;
