// local
import styles from './Landing.module.css';
import MainButton from '../../ui/button/MainButton';
import Loading from '../Loading-Page/Loading';
import Footer from '../../components/footer/Footer';
import { getUserDetails } from '../../Redux/authUserSlice';

// react router
import { useNavigate } from 'react-router';

// react 
import { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// icons
import { FaTasks, FaProjectDiagram, FaCalendarAlt, FaUserShield, FaLock, FaChartLine } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';

export default function LandingPage() {
    const [loading, setLoading] = useState(false)
    const userDetails = useSelector(getUserDetails)
    const navigate = useNavigate()

    // handle go to login page
    function handleGoToLogin() {
        setLoading(true)
        setTimeout(() => {
            if (!userDetails) {
                navigate("/login")
            } else {
                navigate("/dashboard")
            }
        }, 1000);
        setTimeout(() => {
            setLoading(false)
        }, 1500);
    }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <BiTask className={styles.logoIcon} />
                        Planora
                    </div>

                    <ul className={styles.navLinks}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#message">Our Message</a></li>
                    </ul>
                    <MainButton type="button" title={!userDetails ? "go to login" : "go to dashboard"} content={!userDetails ? "Login" : "Dashboard"} clickEvent={() => handleGoToLogin()} isDisabled={loading} />
                </div>
            </nav>
            <div className={styles.landing}>
                {/* NAVBAR */}

                {/* HERO */}
                <section className={styles.hero} id="home">
                    <div className={styles.heroContent}>
                        <h1>
                            Organize your work.<br />
                            <span>Plan smarter with Planora.</span>
                        </h1>

                        <p>
                            A professional task & project management app designed
                            for focus, clarity, and productivity.
                        </p>

                        <div className={styles.heroActions}>
                            <MainButton type="button" title={!userDetails ? "go to login" : "go to dashboard"} content="Get started" clickEvent={() => handleGoToLogin()} isDisabled={loading} />
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className={styles.features} id="features">
                    <h2>Everything you need to stay productive</h2>

                    <div className={styles.featuresGrid}>
                        <Feature
                            title="Advanced Tasks"
                            desc="Create, manage, prioritize, and track tasks easily."
                            icon={<FaTasks />}
                        />
                        <Feature
                            title="Projects & Categories"
                            desc="Organize tasks into structured projects."
                            icon={<FaProjectDiagram />}
                        />
                        <Feature
                            title="Calendar View"
                            desc="Visualize deadlines and upcoming tasks."
                            icon={<FaCalendarAlt />}
                        />
                        <Feature
                            title="Role-based Access"
                            desc="Collaborate with controlled permissions."
                            icon={<FaUserShield />}
                        />
                        <Feature
                            title="Privacy & Security"
                            desc="Your tasks stay protected and private."
                            icon={<FaLock />}
                        />
                        <Feature
                            title="Statistics & Insights"
                            desc="Track progress and performance visually."
                            icon={<FaChartLine />}
                        />
                    </div>
                </section>

                {/* ABOUT */}
                <section className={styles.about} id="about">
                    <div className={styles.aboutContent}>
                        <h2>Built for focus and clarity</h2>
                        <p>
                            Planora is built with a clean, distraction-free interface.
                            Whether you work alone or with a team, it adapts to your workflow.
                        </p>
                    </div>
                </section>

                {/* MESSAGE */}
                <section className={styles.message} id="message">
                    <h2>Our Message</h2>
                    <p>
                        Productivity is not about doing more.
                        It's about doing the right things — intentionally.
                    </p>
                </section>

                {/* FOOTER */}
                <footer className={styles.footer}>
                    <div className={styles.footerContent}>
                        <div className={styles.footerBrand}>
                            <div className={styles.logo}>
                                <BiTask className={styles.logoIcon} />
                                Planora
                            </div>
                            <p>
                                Planora helps you organize, prioritize, and track your work
                                with ease. Stay focused and get more done.
                            </p>
                        </div>

                        <div className={styles.footerLinks}>
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#message">Message</a></li>
                            </ul>
                        </div>
                    </div>
                    <Footer />
                </footer>
            </div>
            {loading && <Loading />}
        </>
    );
}

function Feature({ title, desc, icon }) {
    return (
        <div className={styles.featureCard}>
            <div className={styles.featureIcon}>{icon}</div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}
