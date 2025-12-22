// local
import { Favorites } from "../../context/context";
import { getMovieDetails, BASE_IMAGE_URL } from "../../services/tmdbApi";
import { getTVDetails } from "../../services/tmdbApi";
import updateUserData from "../../firebase/firbaseUpdateData";
import { UserContext } from "../../context/context";
import MainButton from "../../ui/button/mainButton";
import styles from "./favoritePage.module.css";
import { DeatilsType } from "../../context/context";

// react 
import { useContext, useEffect, useState } from "react";

// react router
import { useNavigate } from "react-router";

//react icons 
import { FaStar, FaTrash } from "react-icons/fa";

function FavoritePage() {
    const { favData } = useContext(Favorites);
    const { userDetails } = useContext(UserContext);
    const { setType } = useContext(DeatilsType)
    const [pageData, setPageData] = useState([]);
    const navigate = useNavigate();

    // handle remove from fav 
    function handleRemoveFromFav(id) {
        favData.forEach((i) => {
            if (i.id === id) {
                async function remove() {
                    const item = { type: i.type, id: i.id }
                    await updateUserData({ data: item, userId: userDetails.id, action: "remove" })
                }
                remove()
            }
        })
    }

    // go to details
    function handleNavigate(type, id) {
        if (type === "tv") {
            setType("tv")
            navigate(`/details/${id}`);
        } else if (type === "movie") {
            setType("movies")
            navigate(`/details/${id}`);
        }
    }

    // set data in first render and any change in data 
    useEffect(() => {
        let isMounted = true;

        async function fetchData() {
            if (!favData || !favData.length) {
                if (isMounted) setPageData([]);
                return;
            }

            const requests = favData.map(async (item) => {
                try {
                    if (item.type === "tv") {
                        const data = await getTVDetails(item.id);
                        return { ...data, internal_type: 'tv' };
                    }
                    if (item.type === "movies") {
                        const data = await getMovieDetails(item.id);
                        return { ...data, internal_type: 'movie' };
                    }
                } catch (error) {
                    console.error("Error fetching details for fav item:", item, error);
                    return null;
                }
            });

            const results = await Promise.all(requests);
            if (isMounted) {
                setPageData(results.filter(Boolean));
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [favData]);

    if (!pageData) return <div className={styles.container}><h2 style={{ color: 'white' }}>Loading...</h2></div>;

    return (
        <div className={styles.container}>
            {pageData.length === 0 ? (
                <div className={styles.emptyMessage}>
                    <p>No favorites added yet.</p>
                </div>
            ) : (
                pageData.map((item) => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img
                                src={item.poster_path ? `${BASE_IMAGE_URL}${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
                                alt={item.title || item.name}
                                className={styles.image}
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.info}>
                            <div>
                                <h3 className={styles.title}>{item.title || item.name}</h3>
                                <div className={styles.meta}>
                                    <span className={styles.rating}>
                                        <FaStar color="#FFC107" />
                                        {item.vote_average?.toFixed(1)}
                                    </span>
                                    <span className={styles.date}>
                                        {item.release_date?.split('-')[0] || item.first_air_date?.split('-')[0]}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.actions}>
                                <MainButton
                                    content="Details"
                                    clickEvent={() => handleNavigate(item.internal_type, item.id)}
                                    title="View Details"
                                />
                                <div onClick={() => handleRemoveFromFav(item.id)}>
                                    <MainButton
                                        content={<FaTrash/>}
                                        clickEvent={() => handleRemoveFromFav(item.id)}
                                        title="Remove from Favorites"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default FavoritePage;