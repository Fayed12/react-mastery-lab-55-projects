// local
import style from "./footer.module.css"

function Footer() {
    return (
        <footer className={style.footerContainer}>
            <p className={style.text}> &copy; {new Date().getFullYear()} All rights reserved, <span>By Mohamed Fayed</span></p>
        </footer>
    );
}

export default Footer;