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

    // Show loading while checking login
    if (loading) return <Loading />;

    // User not logged in → redirect to home
    if (!isLogin) {
        return <Navigate to="/" replace />;
    }

    // Logged in → render page
    return children;
}

export default ProtectRoute;
