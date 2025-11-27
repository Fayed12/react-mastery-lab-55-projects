// local
import Header from "../components/home-layout/Header/Header";
import Footer from "../components/home-layout/Footer/Footer";

// react router
import { Outlet } from "react-router";

function HomeLayout() {
    return (
        <div className="container">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomeLayout;