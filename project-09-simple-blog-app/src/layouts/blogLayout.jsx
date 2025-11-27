// react 
import { useContext } from "react";

// context
import { userContext } from "../context/userContext";

function BlogLayout() {
    const { user, isLogin } = useContext(userContext);
    console.log(user, isLogin)
    return (
        <div>
            <h1>Blog Layout</h1>
        </div>
    );
}

export default BlogLayout;
