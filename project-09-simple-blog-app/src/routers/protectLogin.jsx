// react router
import { Navigate } from "react-router";

// react
import { useContext } from "react";

// local
import { userContext } from "../context/userContext";

function ProtectLogin({ children }) {
    const { isLogin } = useContext(userContext);

    if (isLogin) {
        return <Navigate to="/blog" replace={true} />;
    }

    return children;
}

export default ProtectLogin;
