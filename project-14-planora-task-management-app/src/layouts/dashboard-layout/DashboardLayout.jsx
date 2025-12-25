// local
import styles from "./DashboardLayout.module.css"
import logoutWithFirebase from "../../firebase/auth/firebaseLogout";

function DashboardLayout() {
    return (
        <>
            <h1 className={styles.DashboardLayout}>Dashboard layout</h1>
            <button onClick={()=>logoutWithFirebase()}>logout</button>
        </>
    )
}

export default DashboardLayout;