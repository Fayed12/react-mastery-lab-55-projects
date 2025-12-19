// react
import { useMemo, useState } from "react";

// local
import { ThemeContext } from "./context";


function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("dark");

    const value = useMemo(() => {
        return { theme, setTheme };
    }, [theme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
