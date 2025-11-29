// react context
import { createContext, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(() => {
        const isLogin = sessionStorage.getItem("isLogin") || localStorage.getItem("isLogin");
        return isLogin === "true";
    }); 
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user") || localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const value = useMemo(() => {
        return {
            user,
            setUser,
            isLogin,
            setIsLogin,
        }
    }, [user, isLogin]);
    
    return (
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    );
};