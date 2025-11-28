// react router
import { Navigate } from "react-router";

// react
import { useContext, useState, useEffect } from "react";

// local
import { userContext } from "../context/userContext";
import Loading from "../pages/loading/loading";

function ProtectLogin({ children }) {
    const { isLogin } = useContext(userContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (isLogin) {
        return <Navigate to="/blog" replace={true} />;
    }

    return children;
}

export default ProtectLogin;
