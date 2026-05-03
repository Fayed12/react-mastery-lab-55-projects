// local
import styles from './Landing.module.css';
import MainButton from '../../ui/button/MainButton';
import Loading from '../Loading-Page/Loading';
import Footer from '../../components/footer/Footer';
import { getUserDetails } from '../../Redux/authUserSlice';
import { getThemeValue } from '../../Redux/themeSlice';
import { setThemeToggle } from '../../Redux/themeSlice';

// react router
import { useNavigate } from 'react-router';

// react 
import { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';

// icons
import {
    FaTasks, FaProjectDiagram, FaCalendarAlt, FaUserShield,
    FaLock, FaChartLine, FaArrowRight, FaCheckCircle, FaStar,
    FaRegLightbulb
} from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { MdOutlineSpeed, MdLightMode, MdDarkMode } from 'react-icons/md';

export default function LandingPage() {
    const [loading, setLoading] = useState(false);

    const themeValue = useSelector(getThemeValue);
    const userDetails = useSelector(getUserDetails);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Mouse Parallax effect states
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;
        setMousePos({ x, y });
    };

    // handle go to login page
    function handleGoToLogin() {
        setLoading(true);
        setTimeout(() => {
            if (!userDetails) {
                navigate("/login");
            } else {
                navigate("/dashboard");
            }
        }, 1000);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }

    return (
        <>
            <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
                <div className={styles.navContainer}>
                    <div className={styles.logo}>
                        <BiTask className={styles.logoIcon} />
                        Planora
                    </div>

                    <ul className={styles.navLinks}>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#how-it-works">How it works</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                    <div className={styles.NavActions}>
                        <div className={styles.Actions}>
                            {themeValue === "light" ? <span onClick={() => dispatch(setThemeToggle("dark"))}><MdDarkMode /></span> : <span onClick={() => dispatch(setThemeToggle("light"))}><MdLightMode /></span>}
                        </div>
                        <MainButton type="button" title={!userDetails ? "go to login" : "go to dashboard"} content={!userDetails ? "Login" : "Dashboard"} clickEvent={() => handleGoToLogin()} isDisabled={loading} />
                    </div>
                </div>
            </nav>
            <div className={styles.landing}>

                {/* HERO */}
                <section className={styles.hero} id="home" onMouseMove={handleMouseMove}>
                    {/* Parallax Blobs */}
                    <div
                        className={styles.blob1}
                        style={{ transform: `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px)` }}
                    ></div>
                    <div
                        className={styles.blob2}
                        style={{ transform: `translate(${mousePos.x * -1.5}px, ${mousePos.y * -1.5}px)` }}
                    ></div>

                    <div className={styles.heroContainer}>
                        <div className={styles.heroContent}>
                            <div className={styles.badge}>
                                <FaStar className={styles.badgeIcon} />
                                <span>The Ultimate Task Manager</span>
                            </div>
                            <h1>
                                Organize your work.<br />
                                <span className={styles.gradientText}>Plan smarter with Planora.</span>
                            </h1>
                            <p>
                                A professional task & project management app designed
                                for focus, clarity, and productivity. Streamline your workflow today.
                            </p>
                            <div className={styles.heroActions}>
                                <MainButton
                                    type="button"
                                    title={!userDetails ? "go to login" : "go to dashboard"}
                                    content={
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {!userDetails ? "Get Started for Free" : "Go to Dashboard"} <FaArrowRight />
                                        </div>
                                    }
                                    clickEvent={() => handleGoToLogin()}
                                    isDisabled={loading}
                                />
                            </div>

                            <div className={styles.heroStats}>
                                <div className={styles.statItem}>
                                    <MdOutlineSpeed className={styles.statIcon} />
                                    <span>Fast & Fluid</span>
                                </div>
                                <div className={styles.statItem}>
                                    <FaLock className={styles.statIcon} />
                                    <span>Secure</span>
                                </div>
                                <div className={styles.statItem}>
                                    <FaCheckCircle className={styles.statIcon} />
                                    <span>Easy to Use</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.heroVisual} style={{ transform: `translate(${mousePos.x * -0.8}px, ${mousePos.y * -0.8}px)` }}>
                            <div className={styles.mockupWindow}>
                                <div className={styles.mockupHeader}>
                                    <span className={styles.dot} style={{ backgroundColor: '#ff5f56' }}></span>
                                    <span className={styles.dot} style={{ backgroundColor: '#ffbd2e' }}></span>
                                    <span className={styles.dot} style={{ backgroundColor: '#27c93f' }}></span>
                                </div>
                                <div className={styles.mockupBody}>
                                    <div className={styles.mockupSidebar}>
                                        <div className={styles.mockupLine}></div>
                                        <div className={styles.mockupLine}></div>
                                        <div className={styles.mockupLine}></div>
                                    </div>
                                    <div className={styles.mockupMain}>
                                        <div className={styles.mockupTitle}></div>
                                        <div className={styles.mockupGrid}>
                                            <div className={styles.mockupCard1}></div>
                                            <div className={styles.mockupCard2}></div>
                                            <div className={styles.mockupCard3}></div>
                                            <div className={styles.mockupCard4}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className={styles.howItWorks} id="how-it-works">
                    <div className={styles.sectionHeader}>
                        <h2>How Planora Works</h2>
                        <p>Three simple steps to supercharge your productivity.</p>
                    </div>
                    <div className={styles.stepsContainer}>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>1</div>
                            <div className={styles.stepIcon}><FaProjectDiagram /></div>
                            <h3>Create Projects</h3>
                            <p>Organize your goals into manageable projects and categories.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>2</div>
                            <div className={styles.stepIcon}><FaTasks /></div>
                            <h3>Add Tasks</h3>
                            <p>Break down your projects into actionable, bite-sized tasks.</p>
                        </div>
                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>3</div>
                            <div className={styles.stepIcon}><FaChartLine /></div>
                            <h3>Track Progress</h3>
                            <p>Monitor your success visually through intuitive statistics.</p>
                        </div>
                    </div>
                </section>

                {/* FEATURES */}
                <section className={styles.features} id="features">
                    <div className={styles.sectionHeader}>
                        <h2>Everything you need to stay productive</h2>
                        <p>Powerful features packed into a beautifully simple interface.</p>
                    </div>

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

                {/* ABOUT & CTA */}
                <section className={styles.aboutCta} id="about">
                    <div className={styles.aboutContent}>
                        <FaRegLightbulb className={styles.aboutIcon} />
                        <h2>Built for focus and clarity</h2>
                        <p>
                            Planora is built with a clean, distraction-free interface.
                            Whether you work alone or with a team, it adapts to your workflow.
                            Productivity is not about doing more. It's about doing the right things — intentionally.
                        </p>
                        <MainButton
                            type="button"
                            title={!userDetails ? "go to login" : "go to dashboard"}
                            content="Start Your Journey"
                            clickEvent={() => handleGoToLogin()}
                            isDisabled={loading}
                        />
                    </div>
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
                                <li><a href="#how-it-works">How it works</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#about">About</a></li>
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
            <div className={styles.featureIconWrapper}>
                <div className={styles.featureIcon}>{icon}</div>
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}
