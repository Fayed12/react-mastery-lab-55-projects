// local
import styles from './About.module.css';

const About = () => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.title}>About Us</h1>
                <p className={styles.description}>
                    Welcome to Simple Blog App! This is a project where I showcase my work
                    and share knowledge about web development.
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

