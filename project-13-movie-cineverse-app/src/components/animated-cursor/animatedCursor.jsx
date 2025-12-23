// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AnimatedCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        const move = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", move);

        // detect hover on clickable elements
        const addHover = () => setIsHover(true);
        const removeHover = () => setIsHover(false);

        document.querySelectorAll("a, button, input").forEach((el) => {
            el.addEventListener("mouseenter", addHover);
            el.addEventListener("mouseleave", removeHover);
        });

        return () => {
            window.removeEventListener("mousemove", move);
            document.querySelectorAll("a, button, input").forEach((el) => {
                el.removeEventListener("mouseenter", addHover);
                el.removeEventListener("mouseleave", removeHover);
            });
        };
    }, []);

    return (
        <>
            {/* inner cursor */}
            <motion.div
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                }}
                transition={{ type: "spring", stiffness: 900, damping: 40 }}
                style={innerStyle}
            />

            {/* outer cursor */}
            <motion.div
                animate={{
                    x: position.x - 18,
                    y: position.y - 18,
                    scale: isHover ? 1.8 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={outerStyle}
            />
        </>
    );
}

export default AnimatedCursor;

const innerStyle = {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "white",
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    mixBlendMode: "difference",
};

const outerStyle = {
    width: 36,
    height: 36,
    borderRadius: "50%",
    border: "2px solid white",
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9998,
    mixBlendMode: "difference",
};
