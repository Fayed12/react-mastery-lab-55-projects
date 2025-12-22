// local
import { searchMulti, BASE_IMAGE_URL } from "../../services/tmdbApi";
import MainButton from "../../ui/button/mainButton";
import SetPageValue from "../../components/page-value/setPageValue";
import updateUserData from "../../firebase/firbaseUpdateData";
import { DeatilsType } from "../../context/context";
import { Favorites } from "../../context/context";
import { UserContext } from "../../context/context";
import styles from "./searchMovies.module.css"

// react 
import { useEffect, useState, useContext } from "react";

// react router
import { useSearchParams, useNavigate } from "react-router";

// icons
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

function SearchMovies() {
    const { setType } = useContext(DeatilsType)
    const { favData } = useContext(Favorites)
    const { userDetails } = useContext(UserContext)

    const [serachQueary, setSearchQueary] = useState("")
    const [page, setPage] = useState(1)
    const [data, setData] = useState(null)
    const [favoritesData, setFavoriteData] = useState(() => {
        let obj = {}
        favData?.forEach((item) => {
            obj = { ...obj, [item?.id]: true }
        })

        return obj
    });

    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query")

    // handle navigate to user 
    function handleNavigateToDetails(type, id) {
        if (type === "tv") {
            setType("tv")
            navigate(`/details/${id}`);
        } else if (type === "movie") {
            setType("movies")
            navigate(`/details/${id}`);
        }
    }

    // handle toggle favorite
    async function toggleFavorite(e, id, mediaType) {
        e.stopPropagation(); // prevent card click navigation

        // Optimistic update
        setFavoriteData(prev => ({
            ...prev,
            [id]: !prev[id]
        }));

        const item = { type: mediaType === 'movie' ? 'movies' : 'tv', id }

        if (!favoritesData[id]) {
            await updateUserData({ data: item, userId: userDetails.id, action: "add" })
        } else {
            await updateUserData({ data: item, userId: userDetails.id, action: "remove" })
        }
    }

    // handle change value in input
    function handeChangeValue(e) {
        setSearchQueary(e.target.value)
    }

    // handle search to value by name
    function handleSearchValue() {
        setSearchParams({ "query": serachQueary })

        // reset value
        setSearchQueary("")
    }

    // search when value is changed
    useEffect(() => {
        if (query) {
            async function getData() {
                try {
                    const item = await searchMulti(query, page);
                    if (item?.results.length > 0) {
                        const filteredData = item?.results.filter((i) => {
                            return (i?.media_type === "movie" || i?.media_type === "tv") && i.poster_path; // Only show items with posters for better UI
                        })
                        setData({ results: filteredData, total_pages: item.total_pages })
                    } else {
                        setData({ results: [], total_pages: 0 })
                    }
                } catch (err) {
                    console.log(err.message)
                }
            }
            getData()
        }
        else return;
        // Scroll to top on page change
        window.scrollTo(0, 0);
    }, [query, page])

    return (
        <div className={styles.searchPageContainer}>
            <div className={styles.searchSection}>
                <input
                    placeholder="Search movies & TV shows..."
                    type="text"
                    value={serachQueary || ""}
                    onChange={(e) => handeChangeValue(e)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchValue()}
                />
                <MainButton content="Search" title="Search" type="button" clickEvent={() => handleSearchValue()} />
            </div>

            {/* data grid */}
            {data?.results?.length > 0 ? (
                <>
                    <div className={styles.gridContainer}>
                        {data.results.map((item) => (
                            <div
                                key={item.id}
                                className={styles.card}
                                onClick={() => handleNavigateToDetails(item.media_type, item.id)}
                            >
                                {/* Background Image */}
                                <div
                                    className={styles.cardBackground}
                                    style={{
                                        backgroundImage: `url(${BASE_IMAGE_URL}${item.backdrop_path || item.poster_path})`
                                    }}
                                ></div>

                                {/* Content Overlay */}
                                <div className={styles.cardContent}>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }} onClick={(e) => toggleFavorite(e, item.id, item.media_type)}>
                                        {favoritesData[item.id] ? <FaHeart color="#e91e63" size={24} /> : <FaRegHeart color="white" size={24} />}
                                    </div>

                                    <img
                                        src={`${BASE_IMAGE_URL}${item.poster_path}`}
                                        alt={item.title || item.name}
                                        className={styles.poster}
                                        loading="lazy"
                                    />

                                    <div className={styles.details}>
                                        <h3 className={styles.title}>{item.title || item.name}</h3>

                                        <div className={styles.metaRow}>
                                            <span className={`${styles.badge} ${item.media_type === 'movie' ? '' : styles.tv}`}>
                                                {item.media_type === 'movie' ? 'Movie' : 'TV'}
                                            </span>
                                            <span className={styles.vote}>
                                                <FaStar /> {item.vote_average?.toFixed(1)}
                                            </span>
                                            <span>
                                                {(item.release_date || item.first_air_date)?.split('-')[0]}
                                            </span>
                                        </div>

                                        {item.adult && <span className={`${styles.badge} ${styles.adult}`}>18+</span>}

                                        <p className={styles.overview}>
                                            {item.overview || "No overview available."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.pagination}>
                        <SetPageValue page={page} setPage={setPage} totalPages={data?.total_pages} />
                    </div>
                </>
            ) : (
                query && <div className={styles.loading}>
                    {data ? "No results found." : "Start searching..."}
                </div>
            )}
        </div>
    );
}

export default SearchMovies;
