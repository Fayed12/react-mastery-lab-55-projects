// local
import { getTVDetails } from "../../services/tmdbApi";
import { getMovieDetails } from "../../services/tmdbApi";
import { DeatilsType } from "../../context/context"
import { BASE_IMAGE_URL } from "../../services/tmdbApi";
import { getPersonDetails } from "../../services/tmdbApi";
import CreatorInfo from "../../components/creator-Info/creatorInfo";
import { Favorites } from "../../context/context";
import styles from "./cardDetails.module.css"
import updateUserData from "../../firebase/firbaseUpdateData";
import { UserContext } from "../../context/context";

// react 
import { useEffect, useContext, useState } from "react";

// react router
import { useParams, useNavigate } from "react-router";

// react icons
import { FaArrowLeft, FaStar, FaCalendar, FaClock, FaLink, FaLanguage, FaBuilding, FaTv, FaMoneyBillWave, FaHeart, FaRegHeart } from "react-icons/fa";

function CardDetails() {
    const { type } = useContext(DeatilsType);
    const { favData } = useContext(Favorites)
    const { userDetails } = useContext(UserContext)

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openUserInfo, setOpenUserInfo] = useState(false)
    const [creatorInfo, setCreatorInfo] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // Toggle favorite handler
    const toggleFavorite = async (id) => {
        if (!isFavorite) {
            const item = { type, id }
            await updateUserData({ data: item, userId: userDetails.id, action: "add" })
            setIsFavorite(true)
        } else {
            const item = { type, id }
            await updateUserData({ data: item, userId: userDetails.id, action: "remove" })
            setIsFavorite(false)
        }
    };

    // handle click to user
    function handleClickCreator(id) {
        if (id) {
            async function getData() {
                const res = await getPersonDetails(id);
                setCreatorInfo(res);
                setOpenUserInfo(true)
                console.log(res)
            }
            getData()
        }
    }

    // get data when open the page 
    useEffect(() => {
        async function getData() {
            setLoading(true);
            let res = null;
            if (type === "tv") {
                res = await getTVDetails(id);
            } else if (type === "movies") {
                res = await getMovieDetails(id);
            }
            setData(res);
            setLoading(false);
        }
        getData();
    }, [id, type]);

    // set is fav or not when open page
    useEffect(() => {
        favData?.forEach((fav) => {
            if (fav?.id === data?.id) {
                setIsFavorite(true)
            }
        })
    }, [favData, data])

    if (loading || data === null) {
        return (
            <div className={styles.loading}>
                <span>Loading...</span>
                <span></span>
            </div>
        );
    }

    const isMovie = type === "movies";
    const title = isMovie ? data.title : data.name;
    const releaseDate = isMovie ? data.release_date : data.first_air_date;
    const runtime = isMovie ? data.runtime : (data.episode_run_time?.[0] || 0);

    const formatCurrency = (value) => {
        if (!value) return "N/A";
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <>
            <div className={styles.mainDetailsPage}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>

                {/* Hero Section */}
                <div className={styles.heroSection}>
                    {data.backdrop_path && (
                        <img
                            src={`${BASE_IMAGE_URL}${data.backdrop_path}`}
                            alt="Background"
                            className={styles.backdropImage}
                        />
                    )}

                    <div className={styles.heroContent}>
                        <img
                            src={data.poster_path ? `${BASE_IMAGE_URL}${data.poster_path}` : 'https://via.placeholder.com/300x450'}
                            alt={title}
                            className={styles.posterImage}
                        />

                        <div className={styles.heroInfo}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                <h1 className={styles.title}>{title}</h1>
                                <button
                                    onClick={() => toggleFavorite(data.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: isFavorite ? '#e91e63' : 'var(--text-secondary)',
                                        fontSize: '2rem',
                                        transition: 'transform 0.2s',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                >
                                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                </button>
                            </div>
                            {data.tagline && <p className={styles.tagline}>{data.tagline}</p>}

                            <div className={styles.badges}>
                                {data.adult && <span className={`${styles.badge} ${styles.adult}`}>18+</span>}
                                {!data.adult && <span className={`${styles.badge} ${styles.safe}`}>PG-13</span>}
                                <span className={`${styles.badge} ${styles.status}`}>{data.status}</span>
                                <span className={`${styles.badge} ${styles.lang}`}>{data.original_language?.toUpperCase()}</span>
                            </div>

                            <div className={styles.statsRow}>
                                <div className={styles.statItem}>
                                    <FaStar />
                                    <span className={styles.statValue}>{data.vote_average?.toFixed(1)}</span>
                                    <span className={styles.statLabel}>({data.vote_count} votes)</span>
                                </div>
                                <div className={styles.statItem}>
                                    <FaCalendar />
                                    <span className={styles.statValue}>{formatDate(releaseDate)}</span>
                                </div>
                                {runtime > 0 && (
                                    <div className={styles.statItem}>
                                        <FaClock />
                                        <span className={styles.statValue}>
                                            {Math.floor(runtime / 60)}h {runtime % 60}m
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.genresList}>
                                {data.genres?.map(genre => (
                                    <span key={genre.id} className={styles.genreTag}>
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            {data.homepage && (
                                <a href={data.homepage} target="_blank" rel="noopener noreferrer" className={styles.homepageLink}>
                                    <FaLink /> Visit Homepage
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={styles.detailsContent}>

                    {/* Overview */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Overview</h2>
                        <p className={styles.overview}>{data.overview}</p>
                    </section>

                    {/* Info Grid */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Information</h2>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}><FaLanguage /> Original Name</span>
                                <span className={styles.infoValue}>{isMovie ? data.original_title : data.original_name}</span>
                            </div>
                            {isMovie && (
                                <>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}><FaMoneyBillWave /> Budget</span>
                                        <span className={styles.infoValue}>{formatCurrency(data.budget)}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}><FaMoneyBillWave /> Revenue</span>
                                        <span className={styles.infoValue}>{formatCurrency(data.revenue)}</span>
                                    </div>
                                </>
                            )}
                            {!isMovie && (
                                <>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}><FaTv /> Total Seasons</span>
                                        <span className={styles.infoValue}>{data.number_of_seasons}</span>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoLabel}><FaTv /> Total Episodes</span>
                                        <span className={styles.infoValue}>{data.number_of_episodes}</span>
                                    </div>
                                </>
                            )}
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}><FaBuilding /> Production Countries</span>
                                <span className={styles.infoValue}>
                                    {data.production_countries?.map(c => c.name).join(", ") || "N/A"}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* TV Specific: Last Episode */}
                    {!isMovie && data.last_episode_to_air && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Last Episode Aired</h2>
                            <div className={styles.episodeCard}>
                                {data.last_episode_to_air.still_path && (
                                    <img
                                        src={`${BASE_IMAGE_URL}${data.last_episode_to_air.still_path}`}
                                        alt={data.last_episode_to_air.name}
                                        className={styles.episodeStill}
                                    />
                                )}
                                <div className={styles.episodeDetails}>
                                    <h3 className={styles.episodeName}>{data.last_episode_to_air.name}</h3>
                                    <div className={styles.episodeMeta}>
                                        <span>Season {data.last_episode_to_air.season_number}</span>
                                        <span>Episode {data.last_episode_to_air.episode_number}</span>
                                        <span>{formatDate(data.last_episode_to_air.air_date)}</span>
                                    </div>
                                    <p className={styles.episodeOverview}>{data.last_episode_to_air.overview}</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Seasons Grid */}
                    {!isMovie && data.seasons && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Seasons</h2>
                            <div className={styles.seasonsGrid}>
                                {data.seasons.map(season => (
                                    <div key={season.id} className={styles.seasonCard}>
                                        <img
                                            src={season.poster_path ? `${BASE_IMAGE_URL}${season.poster_path}` : 'https://via.placeholder.com/200x300'}
                                            alt={season.name}
                                            className={styles.seasonPoster}
                                        />
                                        <div className={styles.seasonInfo}>
                                            <h3 className={styles.seasonName}>{season.name}</h3>
                                            <div className={styles.seasonMeta}>
                                                <span>{season.episode_count} Episodes</span>
                                                {season.air_date && <span>• {season.air_date.split('-')[0]}</span>}
                                            </div>
                                            {season.vote_average > 0 && (
                                                <div className={styles.seasonRating}>
                                                    <FaStar /> {season.vote_average}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Creators */}
                    {!isMovie && data.created_by?.length > 0 && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Created By</h2>
                            <div className={styles.creatorsList}>
                                {data.created_by.map(creator => (
                                    <div key={creator.id} className={styles.creatorCard} onClick={() => handleClickCreator(creator.id)}>
                                        <img
                                            src={creator.profile_path ? `${BASE_IMAGE_URL}${creator.profile_path}` : 'https://via.placeholder.com/100'}
                                            alt={creator.name}
                                            className={styles.creatorAvatar}
                                        />
                                        <span className={styles.creatorName}>{creator.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Collection (Movies) */}
                    {isMovie && data.belongs_to_collection && (
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>Collection</h2>
                            <div className={styles.collectionCard}>
                                <img
                                    src={data.belongs_to_collection.poster_path ? `${BASE_IMAGE_URL}${data.belongs_to_collection.poster_path}` : 'https://via.placeholder.com/150'}
                                    alt={data.belongs_to_collection.name}
                                    className={styles.collectionPoster}
                                />
                                <div className={styles.collectionInfo}>
                                    <h3 className={styles.collectionName}>{data.belongs_to_collection.name}</h3>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Production Companies */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Production Companies</h2>
                        <div className={styles.companiesList}>
                            {data.production_companies?.map(company => (
                                <div key={company.id} className={styles.companyItem}>
                                    {company.logo_path ? (
                                        <img
                                            src={`${BASE_IMAGE_URL}${company.logo_path}`}
                                            alt={company.name}
                                            className={styles.companyLogo}
                                        />
                                    ) : (
                                        // Placeholder for company without logo to keep layout consistent
                                        <div style={{ height: '60px', display: 'flex', alignItems: 'center' }}>No Logo</div>
                                    )}
                                    <span className={styles.companyName}>{company.name}</span>
                                    <span className={styles.companyCountry}>{company.origin_country}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
            {openUserInfo && <CreatorInfo data={creatorInfo} closePopup={() => setOpenUserInfo(false)} />}
        </>
    );
}

export default CardDetails;

