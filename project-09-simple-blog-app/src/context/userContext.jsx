// react context
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false); 
    const [user, setUser] = useState(null);
    
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