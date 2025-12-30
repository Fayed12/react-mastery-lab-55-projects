// local
import styles from './Home.module.css';
import MainButton from "../../ui/button/MainButton"
import { PiShootingStarThin } from "react-icons/pi";

// react router
import { useNavigate } from 'react-router';

const Home = () => {
    const navigate = useNavigate()
    return (
        <section className={styles.home}>
            <div className={styles.content}>
                <span className={styles.welcome}>
                    Welcome to Planora
                </span>

                <h1 className={styles.title}>
                    <span>Plan smarter</span>
                    <span>Stay focused. Get things done.</span>
                </h1>

                <p className={styles.description}>
                    Manage your tasks and projects in one clean,
                    powerful dashboard designed for clarity and productivity.
                </p>


                <MainButton title='got ot tasks' content={<>Go To Tasks {" "} <PiShootingStarThin /></>} clickEvent={() => navigate("/dashboard/tasks")} />
            </div>
        </section>
    );
};

export default Home;
