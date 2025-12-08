// local
import styles from "./errorPage.module.css";
import MainButton from "../../components/ui/button/mainButton";

// react router
import { useNavigate } from "react-router";

function ErrorPage() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.errorPage}>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <MainButton type="button" title="back" children="back" onclick={() => navigate(-1, {replace: true})}/>
            </div>
        </div>
    );
}

export default ErrorPage;
