// local
import styles from './Error.module.css';
import MainButton from '../../ui/button/MainButton';

// react router
import { useNavigate } from 'react-router';

// react icons
import { IoMdArrowRoundBack } from "react-icons/io";

const ErrorPage = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.errorContainer}>
            <h1 className={styles.title}>Something went wrong</h1>
            <p className={styles.message}>Please try refreshing the page or contact support.</p>
            <MainButton type='button' clickEvent={() => navigate(-1, { replace: true })} title='back' content={<><IoMdArrowRoundBack /> Back </>}/>
        </div>
    );
};

export default ErrorPage;
