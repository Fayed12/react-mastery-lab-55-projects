// local
import style from "./error.module.css"

// react router
import { useNavigate } from "react-router";

// DotLottieReact
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function ErrorPage() {
    const navigate = useNavigate()
    return ( 
        <>
            <div className={style.errorPage}>
                <div className={style.errorPage__animation}>
                    <DotLottieReact src="/animation/Error.json" loop autoplay />
                </div>
                <button type="button" title="button" onClick={()=>navigate(-1, {replace:true})}>Back</button>
            </div>
        </>
    );
}

export default ErrorPage;