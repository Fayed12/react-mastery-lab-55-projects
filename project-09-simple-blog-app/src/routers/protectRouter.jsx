// react
import { useContext } from "react";

// react router
import { Navigate } from "react-router";

// local
import { userContext } from "../context/userContext";

function ProtectRoute({children}) {
    const { isLogin } = useContext(userContext);
    
    if (!isLogin) {
        return <Navigate to="/" replace={true} />;
    }
    
    return children;
}

export default ProtectRoute;
