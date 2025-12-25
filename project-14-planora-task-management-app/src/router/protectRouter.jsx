// local
import { getUserDetails } from "../Redux/authUserSlice";

// redux
import { useSelector } from "react-redux";

// react router
import { Navigate } from "react-router";

function ProtectRouter({ children }) {
    const userDetails = useSelector(getUserDetails);

    if (!userDetails) {
        return <Navigate to={"/login"} replace={true } />
    }

    return children
}

export default ProtectRouter