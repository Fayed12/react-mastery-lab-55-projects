// local
import style from "./error.module.css"
import Button from "../../ui/button/button";

// react router
import { useNavigate } from "react-router";

// DotLottieReact
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaArrowLeft } from "react-icons/fa";

function ErrorPage() {
    const navigate = useNavigate()
    return ( 
        <>
            <div className={style.errorPage}>
                <div className={style.errorPage__animation}>
                    <DotLottieReact src="/animation/Error.json" loop autoplay />
                </div>
                <Button type="button" title="Back" onClick={() => navigate(-1, { replace: true })} content={<><FaArrowLeft /> Back</>} />
            </div>
        </>
    );
}

export default ErrorPage;