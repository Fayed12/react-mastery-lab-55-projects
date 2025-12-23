// local
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import WelcomeMessage from "./components/welcome-message/welcome";

// react router
import { Outlet } from "react-router";

// react 
import { useEffect,useState } from "react";

function AppLayout() {
    const [openWlecome, setOpenWelcome] = useState(() => {
        const open = sessionStorage.getItem("openwelcome")
        if (open) {
            return open === "true"
        } else {
            return true
        }
    })

    // close open after timeing is end
    useEffect(() => {
        if (openWlecome) {
            setTimeout(() => {
                setOpenWelcome(false)
                sessionStorage.setItem("openwelcome", false)
            }, 5000);
        }
    },[openWlecome])

    if (openWlecome) {
        return <WelcomeMessage/>
    }

    return (
        <div className="all-page">
            <nav>
                <NavBar />
            </nav>
            <main>
                <Outlet />
                <ScrollToTop/>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default AppLayout;
