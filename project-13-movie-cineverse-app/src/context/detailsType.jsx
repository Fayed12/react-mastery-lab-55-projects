// local
import { DeatilsType } from "./context";

// react
import { useMemo, useState } from "react";

function DeatilsTypeProvider({ children }) {
    const [type, setType] = useState("")

    const value = useMemo(() => {
        return { type, setType }
    }, [type])

    return (
        <DeatilsType.Provider value={value}>
            {children}
        </DeatilsType.Provider>
    )
}

export default DeatilsTypeProvider;