// react context
import { createContext, useMemo, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userPostsContext = createContext();

function UserPostsContextProvider({ children }) {
    const [userPosts, setUserPosts] = useState([]);

    const value = useMemo(() => {
        return {
            userPosts,
            setUserPosts,
        }
    }, [userPosts]);
    return (
        <userPostsContext.Provider value={value}>
            {children}
        </userPostsContext.Provider>
    );
}

export default UserPostsContextProvider;
