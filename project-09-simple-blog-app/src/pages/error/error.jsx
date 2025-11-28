// react router
import { useNavigate } from 'react-router';

// local
import styles from './error.module.css';
import NotFoundSvg from './NotFoundSvg';
import Loading from '../loading/Loading';

// react
import { useState } from 'react';

function Error() {
    const navigate = useNavigate();
    const [openLoading, setOpenLoading] = useState(false);

    // click to navigate back
    function handleClick() {
        setOpenLoading(true);
        setTimeout(() => {
            navigate(-1);
        }, 1000);
        setTimeout(() => {
            setOpenLoading(false);
        }, 1200);
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <NotFoundSvg />
                    <h1 className={styles.title}>Page Not Found</h1>
                    <p className={styles.message}>Oops! The page you are looking for seems to have vanished into the void.</p>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={handleClick}
                    >
                        Back
                    </button>
                </div>
            </div>
            {openLoading && <Loading />}
        </>
    );
}

export default Error;
