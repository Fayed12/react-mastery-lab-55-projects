// local
import style from "./footer.module.css";

function Footer() {
    return (
        <>
            <p className={style.footer}>&copy; {new Date().getFullYear()} <span>Recipe</span>, All rights reserved </p> 
        </>
    );
}

export default Footer;
