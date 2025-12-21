// local
import { Favorites } from "../../context/context";
import { getMovieDetails } from "../../services/tmdbApi";
import { getTVDetails } from "../../services/tmdbApi";

// react 
import { useContext,useEffect } from "react";

function FavoritePage() {
    const { favData } = useContext(Favorites)

    // set data in first render and any change in data 
    useEffect(() => {
        favData.forEach((item) => {
            console.log(item)
        })
    },[favData])
    return (
        <>
            <h1>favorite</h1>
        </>
    );
}

export default FavoritePage;