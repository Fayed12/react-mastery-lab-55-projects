// local
import style from "./home.module.css";

// react router
import { Link } from "react-router";

function HomePage() {
    return (
        <div className={`page-animate ${style.homeContainer}`}>
            <div className={style.contentSection}>
                <h1 className={style.title}>Welcome to <span className={style.highlight}>Recipe App</span></h1>
                <p className={style.description}>
                    Discover delicious recipes from around the world. Start your culinary journey today!
                </p>
                <button className={style.getStartedBtn}>
                    <Link to="/recipe">Get Started</Link>
                </button>
            </div>
            <div className={style.imageSection}>
                <img src="/chef.png" alt="Chef" className={style.heroImage} />
            </div>
        </div>
    );
}

export default HomePage;
