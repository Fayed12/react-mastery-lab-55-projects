// local
import styles from "./home.module.css"
import { UserContext } from "../../context/context";
import MainButton from "../../ui/button/mainButton";

// react 
import { useContext } from "react";

// react router
import { useNavigate } from "react-router";

// react icons
import { CiSearch } from "react-icons/ci";

function HomePage() {
    const { userDetails } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <h1 className={styles.welcomeTitle}>
                    Welcome <span className={styles.userName}>{userDetails?.name}</span> to
                    <br />
                    <span className={styles.appName}>Cineverse</span>
                </h1>
                <p className={styles.description}>
                    Dive into a universe of boundless entertainment. Browse a huge collection of movies and TV shows
                    by popular, newest, and top rated.
                </p>
                <div className={styles.ctaContainer}>
                    <MainButton
                        type="button"
                        content={
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CiSearch size={22} />
                                <span>Start Exploring</span>
                            </div>
                        }
                        clickEvent={() => navigate("/search", { replace: true })}
                    />
                </div>
            </div>
            <div className={styles.backgroundBlur}></div>
        </div>
    );
}

export default HomePage;
