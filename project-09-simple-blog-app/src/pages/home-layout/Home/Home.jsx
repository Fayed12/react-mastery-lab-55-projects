// react router 
import { useNavigate } from 'react-router';

// local
import styles from './Home.module.css';
import Button from '../../../components/ui/button/button';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.home}>
            <h1>Welcome to the Blog APP</h1>
            <p>This is the home page of our simple blog application.</p>
            <div className={styles.buttonGroup}>
                <Button
                    type="button"
                    onClick={() => navigate('/about', { replace: true })}
                    content="Read More"
                />
                <Button
                    type='button'
                    onClick={() => navigate("/login", { replace: true })}
                    content="Get Started"
                />
            </div>
        </div>
    );
};

export default Home;
