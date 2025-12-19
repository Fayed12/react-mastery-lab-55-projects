// local
import { UserContext } from "../context/context";

// react
import { useContext } from "react";

// react router
import { Navigate } from "react-router";

function ProtectedLogin({children}) {
    const { userDetails } = useContext(UserContext);

    if (userDetails !== null ) {
        <Navigate to="/" replace={ true} />
    }
    
    return {children}
}

export default ProtectedLogin