// local
import style from "./welcome.module.css";

// 
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function WelcomePage(){
    return(
        <div className={style.welcome}>
            <div className={style.lottie}><DotLottieReact src="/animation/Welcome.json" loop={true} autoplay={true} /></div>
        </div>
    )
}

export default WelcomePage;