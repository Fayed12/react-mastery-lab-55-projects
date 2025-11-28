// react context
import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const userPostsContext = createContext();

function UserPostsContextProvider({ children }) {
    const [userPosts, setUserPosts] = useState([]);

    return (
        <userPostsContext.Provider value={{ userPosts, setUserPosts }}>
            {children}
        </userPostsContext.Provider>
    );
}

export default UserPostsContextProvider;
