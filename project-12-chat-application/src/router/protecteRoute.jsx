// local
import { selectUser, selectLoading } from "../redux/authSlice";
import Loading from "../pages/loading/loading";

// react router
import { Navigate } from "react-router";

// redux
import {useSelector } from "react-redux";

function ProtectedRoute({ children }) {
    const user = useSelector(selectUser);
    const loading = useSelector(selectLoading);    
    
    if (loading) return <Loading />;
    
    if (!user) return <Navigate to="/login" replace />

    return children;
}

export default ProtectedRoute;
