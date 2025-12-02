// local
import style from "./loading.module.css"

// DotLottieReact 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
    return (
        <div className={style.loading}>
            <DotLottieReact src="/animation/Loading.json" loop autoplay style={{width: "100%", height: "100%"}} />
        </div>
    )
}

export default Loading
