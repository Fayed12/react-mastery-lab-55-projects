import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.home}>
            <h1>Welcome to the Blog</h1>
            <p>This is the home page of our simple blog application.</p>
        </div>
    );
};

export default Home;
