// react
import { useEffect, useState } from "react";

// local
import styles from "./ScrollToTop.module.css"

// react icons
import { IoIosArrowUp } from "react-icons/io";

function ScrollToTop() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShow(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        show && (
            <button onClick={scrollTop} className={styles.scrollTopBtn}>
                <IoIosArrowUp />
            </button>
        )
    );
}

export default ScrollToTop;
