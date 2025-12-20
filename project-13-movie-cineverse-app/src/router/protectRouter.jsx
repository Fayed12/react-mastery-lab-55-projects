// local
import { UserContext } from "../context/context";
import LoadingPage from "../pages/loading-page/loadingPage"

// react
import { useContext } from "react";

// react router
import { Navigate } from "react-router";

function ProtectedLogin({ children }) {
    const { userDetails, loading } = useContext(UserContext);

    if (loading) return <LoadingPage />;

    if (userDetails === null) {
        return <Navigate to="/login" replace />;
    }

    return children;
}


export default ProtectedLogin