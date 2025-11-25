// local
import Header from "../components/home-layout/Header/Header";
import Footer from "../components/home-layout/Footer/Footer";
import styles from "./homeLayout.module.css";

// react router
import { Outlet } from "react-router";

function HomeLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default HomeLayout;