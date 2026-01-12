// local
import styles from "./DashboardLayout.module.css"
import Footer from "../../components/footer/Footer"
import SideBar from "../../components/sideBar/SideBar"
import Header from "../../components/header/header";
import Loading from "../../pages/Loading-Page/Loading"

// react router
import { Outlet } from "react-router";

// react
import { useState } from "react";
import { Suspense } from "react";

function DashboardLayout() {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <>
            <div className={styles.dashboardLayout}>
                <div className={styles.sideBar}>
                    <SideBar openMenu={openMenu} setOpenMenu={setOpenMenu} />
                </div>
                <div className={styles.mainContent}>
                    <div className={styles.header}>
                        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
                    </div>
                    <div className={styles.content}>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </div>
                    <footer className={styles.footer}>
                        <Footer />
                    </footer>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;