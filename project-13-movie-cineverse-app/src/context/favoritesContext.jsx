// local
import { Favorites } from "./context";

// react
import { useMemo, useState } from "react";

function FavoritesProvider({ children }) {
    const [favData, setFavData] = useState([])

    const value = useMemo(()=> {
        return{favData , setFavData}
    }, [favData])

    return (
        <Favorites.Provider value={value}>
            {children}
        </Favorites.Provider>
    )
}

export default FavoritesProvider;