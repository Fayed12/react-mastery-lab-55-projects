// local
import { useEffect } from "react";
import { getTheme } from "./redux/themeSlice";

// redux
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
    const theme = useSelector(getTheme);

    useEffect(() => {
        if (theme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    }, [theme]);
    
    return children;
};

export default ThemeProvider;
