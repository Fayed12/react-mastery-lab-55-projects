// local
import Header from "../components/home-layout/Header/Header";
import Footer from "../components/home-layout/Footer/Footer";

// react router
import { Outlet } from "react-router";

function HomeLayout() {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default HomeLayout;