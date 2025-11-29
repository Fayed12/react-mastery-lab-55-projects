// react
import { useContext, useEffect, useState } from "react";

// react router
import { Navigate } from "react-router";

// local
import { userContext } from "../context/userContext";
import Loading from "../pages/loading/loading";

function ProtectRoute({ children }) {
    const { isLogin } = useContext(userContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // simulate short loading
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loading />;

    if (!isLogin) {
        return <Navigate to="/login" replace />;
    }

    // Logged in → render page
    return children;
}

export default ProtectRoute;
