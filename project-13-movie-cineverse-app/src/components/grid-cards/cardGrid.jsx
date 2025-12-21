// local
import styles from "./cardGrid.module.css"
import { BASE_IMAGE_URL } from "../../services/tmdbApi"
import { DeatilsType } from "../../context/context";
import { Favorites } from "../../context/context";
import updateUserData from "../../firebase/firbaseUpdateData";
import { UserContext } from "../../context/context";

// react icons
import { TiInfoLarge } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// react router
import { useNavigate } from "react-router";
import { useState } from "react";

// react
import { useContext } from "react";

function CardGrid({ data }) {
    const navigate = useNavigate()
    const { type } = useContext(DeatilsType)
    const { favData } = useContext(Favorites)
    const { userDetails } = useContext(UserContext)

    const [favoritesData, setFavoriteData] = useState(() => {
        let obj = {}
        favData?.forEach((item) => {
            obj = { ...obj, [item?.id]: true }
        })

        return obj
    });

    // handle click to move to details page
    function handleMoveToDetails(id) {
        navigate(`/details/${id}`);
    }

    // handle toggle favorite
    async function toggleFavorite(id) {
        if (!favoritesData[id] || favoritesData[id] === undefined) {
            setFavoriteData(prev => ({
                ...prev,
                [id]: true
            }));
            const item = { type, id }
            await updateUserData({ data: item, userId: userDetails.id, action: "add" })
        } else {
            setFavoriteData(prev => ({
                ...prev,
                [id]: false
            }));
            const item = { type, id }
            await updateUserData({ data: item, userId: userDetails.id, action: "remove" })
        }
    }

    return (
        <>
            <div className={styles.moviesGrid}>
                {data?.results?.map((movie) => (
                    <div className={styles.movieCard} key={movie.id}>
                        <div className={styles.posterContainer}>
                            <img
                                src={movie.poster_path ? `${BASE_IMAGE_URL}${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                                alt={movie.title}
                                className={styles.poster}
                                loading="lazy"
                            />
                        </div>

                        <div className={styles.details}>
                            <div className={styles.titleRow}>
                                <h2>{movie.title}</h2>
                                <span className={styles.movieId}>ID: {movie.id}</span>
                            </div>

                            <div className={styles.badges}>
                                <span className={`${styles.badge} ${movie.adult ? styles.adult : styles.safe}`}>
                                    {movie.adult ? "18+" : "PG"}
                                </span>
                                <span className={`${styles.badge} ${styles.lang}`}>
                                    {movie.original_language}
                                </span>
                                <span className={`${styles.badge} ${styles.info}`} onClick={() => handleMoveToDetails(movie.id)} title="View Details">
                                    <TiInfoLarge />
                                </span>
                                <span
                                    className={`${styles.badge}`}
                                    onClick={() => toggleFavorite(movie.id)}
                                    style={{
                                        cursor: 'pointer',
                                        color: favoritesData[movie.id] ? '#e91e63' : 'inherit',
                                        backgroundColor: favoritesData[movie.id] ? 'rgba(233, 30, 99, 0.1)' : 'var(--bg-hover)',
                                        border: favoritesData[movie.id] ? '1px solid #e91e63' : '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                    title={favoritesData[movie.id] ? "Remove from favoritesData" : "Add to favoritesData"}
                                >
                                    {favoritesData[movie.id] ? <FaHeart /> : <FaRegHeart />}
                                </span>
                            </div>

                            <div className={styles.stats}>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{movie.vote_average?.toFixed(1)}</span>
                                    <span className={styles.statLabel}>Rating</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{movie.vote_count}</span>
                                    <span className={styles.statLabel}>Votes</span>
                                </div>
                                <div className={styles.statItem}>
                                    <span className={styles.statValue}>{Math.round(movie.popularity)}</span>
                                    <span className={styles.statLabel}>Popularity</span>
                                </div>
                            </div>

                            <p className={styles.overview}>
                                {movie.overview || "No overview available."}
                            </p>

                            <div className={styles.releaseDate}>
                                Released: {movie.release_date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CardGrid;