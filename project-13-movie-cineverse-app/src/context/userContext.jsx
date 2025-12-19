// react
import { useMemo, useState } from "react";

// local
import { UserContext } from "./context";

function UserDetailsContext({ children }) {
    const [userDetails, setUserDetails] = useState(null);

    const value = useMemo(() => {
        return { userDetails, setUserDetails };
    }, [userDetails]);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserDetailsContext;
