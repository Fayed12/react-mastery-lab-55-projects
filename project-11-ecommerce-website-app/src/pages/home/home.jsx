// react
import { useState, useEffect } from "react";

// local
import style from "./home.module.css"
import Button from "../../ui/button/button";

// react router
import { useNavigate } from "react-router";

const images = [
    "/food-images/pg-1.png",
    "/food-images/pg-2.png",
    "/food-images/pg-3.png",
    "/food-images/pg-4.png",
    "/food-images/pg-5.png",
    "/food-images/pg-6.png",
];

function HomePage() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className={style.home}>
                <div className={style.text}>
                    <p className={style.welcome}>Welcome in our restaurant App, Foodify</p>
                    <h1>The best restaurant in the world</h1>
                    <p className={style.description}>We offer the best food in the world</p>
                    <div className={style.btnContainer}>
                        <Button type="button" content="order now" onClick={() => navigate("/menu", { replace: true })} disabled={false} />
                    </div>
                </div>
                <div className={style.imageContainer}>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Food ${index + 1}`}
                            className={`${style.image} ${index === currentImageIndex ? style.active : ''}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default HomePage;