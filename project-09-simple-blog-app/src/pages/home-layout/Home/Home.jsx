// react router 
import { useNavigate } from 'react-router';

// local
import styles from './Home.module.css';
import Button from '../../../components/ui/button/button';
import Loading from "../../loading/loading"

// react
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const [openLoading, setOpenLoading] = useState(false);

    // navigate to about page
    const navigateToAbout = () => {
        setOpenLoading(true);
        setTimeout(() => {
            navigate('/about', { replace: true });
        }, 1000);
        setTimeout(() => {
            setOpenLoading(false);
        }, 1200);
    };

    // navigate to login page
    const navigateToLogin = () => {
        setOpenLoading(true);
        setTimeout(() => {
            navigate('/login', { replace: true });
        }, 1000);
        setTimeout(() => {
            setOpenLoading(false);
        }, 1200);
    };
    return (
        <>
            <div className={styles.home}>
                <h1>Welcome to the Blog APP</h1>
                <p>This is the home page of our simple blog application.</p>
                <div className={styles.buttonGroup}>
                    <Button
                        type="button"
                        onClick={navigateToAbout}
                        content="Read More"
                    />
                    <Button
                        type='button'
                        onClick={navigateToLogin}
                        content="Get Started"
                    />
                </div>
            </div>
            {openLoading && <Loading />}
        </>
    );
};

export default Home;
