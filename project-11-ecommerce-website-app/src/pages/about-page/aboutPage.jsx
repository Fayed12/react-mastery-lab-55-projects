import style from "./aboutpage.module.css";
import { FaFire, FaBolt, FaStar, FaCreditCard, FaQuoteLeft } from "react-icons/fa";

const AboutPage = () => {
    return (
        <div className={style.aboutWrapper}>

            {/* ===== Hero Section ===== */}
            <section className={style.hero}>
                <h1>About <span>Foodify</span></h1>
                <p>Your trusted destination for fast, fresh, and delicious food.</p>
            </section>

            {/* ===== Who We Are ===== */}
            <section className={style.section}>
                <h2>Who We Are</h2>
                <p>
                    Foodify is a premium food e-commerce platform delivering high-quality
                    meals, groceries, and fresh products directly to your doorstep.
                    Whether you're craving a quick meal, healthy options, or gourmet
                    dishes — we’ve got you covered.
                </p>
            </section>

            {/* ===== Mission & Vision ===== */}
            <section className={style.grid2}>
                <div className={style.card}>
                    <h3>Our Mission</h3>
                    <p>
                        Making healthy, tasty, and affordable food accessible to everyone,
                        with the fastest delivery possible.
                    </p>
                </div>
                <div className={style.card}>
                    <h3>Our Vision</h3>
                    <p>
                        To become the #1 online food marketplace in the region by offering
                        unbeatable quality, freshness, and service.
                    </p>
                </div>
            </section>

            {/* ===== Why Choose Us ===== */}
            <section className={style.section}>
                <h2>Why Choose Us?</h2>
                <div className={style.features}>
                    <div className={style.featureItem}>
                        <FaFire className={style.icon} />
                        <h4>Fresh Ingredients</h4>
                        <p>We source ingredients daily from trusted suppliers.</p>
                    </div>
                    <div className={style.featureItem}>
                        <FaBolt className={style.icon} />
                        <h4>Fast Delivery</h4>
                        <p>Delivered hot and fresh within minutes.</p>
                    </div>
                    <div className={style.featureItem}>
                        <FaStar className={style.icon} />
                        <h4>Trusted Quality</h4>
                        <p>We follow strict food safety and hygiene standards.</p>
                    </div>
                    <div className={style.featureItem}>
                        <FaCreditCard className={style.icon} />
                        <h4>Secure Payments</h4>
                        <p>Multiple payment methods with full protection.</p>
                    </div>
                </div>
            </section>

            {/* ===== Testimonials ===== */}
            <section className={style.section}>
                <h2>What Our Customers Say</h2>
                <div className={style.testimonials}>
                    <div className={style.testimonialCard}>
                        <FaQuoteLeft className={style.quoteIcon} />
                        <p>“Best food delivery experience ever!”</p>
                        <span>— Ahmed S.</span>
                    </div>
                    <div className={style.testimonialCard}>
                        <FaQuoteLeft className={style.quoteIcon} />
                        <p>“The food is always fresh and hot. Highly recommended!”</p>
                        <span>— Sara M.</span>
                    </div>
                    <div className={style.testimonialCard}>
                        <FaQuoteLeft className={style.quoteIcon} />
                        <p>“Amazing quality and super fast delivery.”</p>
                        <span>— Omar T.</span>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
