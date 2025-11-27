// react context
import { createContext, useState } from "react";

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
    
    return (
        <userContext.Provider value={{
            user,
            setUser,
            isLogin,
            setIsLogin,
        }}>
            {children}
        </userContext.Provider>
    );
};