// react
import { useMemo, useState } from "react";

// local
import { UserContext } from "./context";

function UserDetailsContext({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const value = useMemo(() => {
        return { userDetails, setUserDetails,loading,setLoading };
    }, [userDetails,loading]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserDetailsContext;
