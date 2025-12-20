// local
import NavBar from "./components/navBar/navBar";
import Footer from "./components/footer/footer";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

// react router
import { Outlet } from "react-router";

function AppLayout() {
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
