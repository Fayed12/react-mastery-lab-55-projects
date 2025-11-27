// local
import styles from './About.module.css';

// react router
import { useLoaderData } from 'react-router';

const About = () => {
    const { description, title } = useLoaderData();
    
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.title}>About Us</h1>
                <h3 className={styles.subtitle}>{title}</h3>
                <p className={styles.description}>
                    {description}
                </p>

                <h2 className={styles.featuresTitle}>Features of this Blog:</h2>
                <ul className={styles.featuresList}>
                    <li>View all posts in a clean list</li>
                    <li>Read full post details</li>
                    <li>Create new posts</li>
                    <li>Edit or delete posts</li>
                    <li>Search posts by keywords</li>
                    <li>Filter posts by categories</li>
                    <li>Responsive design for all devices</li>
                    <li>Fast loading with partial data fetching</li>
                </ul>
            </div>
        </section>
    );
};

export default About;

