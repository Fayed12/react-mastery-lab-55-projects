// local
import style from "./error.module.css"

// react router
import { Link } from "react-router";

// DotLottieReact
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function ErrorPage() {
    return ( 
        <>
            <div className={style.errorPage}>
                <div className={style.errorPage__animation}>
                    <DotLottieReact src="/animation/Error.json" loop autoplay />
                </div>
                <Link to="/home" replace={ true}>Back to Home</Link>
            </div>
        </>
    );
}

export default ErrorPage;