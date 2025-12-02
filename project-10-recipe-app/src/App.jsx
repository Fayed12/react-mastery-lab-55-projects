// react router
import { Outlet } from "react-router";

// local
import NavBar from "./components/nav/nav";
import Footer from "./components/footer/footer";

// react 
import { useEffect, useState } from "react";
import WelcomePage from "./pages/welcome/welcome";

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
                <NavBar/>
            </nav>
            <main>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default App;
