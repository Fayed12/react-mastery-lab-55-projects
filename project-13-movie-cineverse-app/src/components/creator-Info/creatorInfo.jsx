import styles from "./creatorInfo.module.css";
import { BASE_IMAGE_URL } from "../../services/tmdbApi";
import { FaTimes, FaBirthdayCake, FaMapMarkerAlt, FaStar, FaGlobe } from "react-icons/fa";

function CreatorInfo({ data, closePopup }) {
    if (!data) return null;

    return (
        <div className={styles.overlay} onClick={closePopup}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={closePopup}>
                    <FaTimes />
                </button>

                <div className={styles.content}>
                    <div className={styles.imageContainer}>
                        <img
                            src={data.profile_path ? `${BASE_IMAGE_URL}${data.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                            alt={data.name}
                            className={styles.profileImage}
                        />
                    </div>

                    <div className={styles.infoContainer}>
                        <div>
                            <span className={styles.department}>{data.known_for_department}</span>
                            <h2 className={styles.name}>{data.name}</h2>
                        </div>

                        {data.biography && (
                            <div className={styles.bioSection}>
                                <span className={styles.bioTitle}>Biography</span>
                                <p className={styles.biography}>{data.biography}</p>
                            </div>
                        )}

                        <div className={styles.metaGrid}>
                            {data.birthday && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}><FaBirthdayCake className={styles.icon} /> Birthday</span>
                                    <span className={styles.metaValue}>{data.birthday}</span>
                                </div>
                            )}
                            {data.place_of_birth && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}><FaMapMarkerAlt className={styles.icon} /> Place of Birth</span>
                                    <span className={styles.metaValue}>{data.place_of_birth}</span>
                                </div>
                            )}
                            {data.popularity && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}><FaStar className={styles.icon} /> Popularity</span>
                                    <span className={styles.metaValue}>{data.popularity.toFixed(1)}</span>
                                </div>
                            )}
                            {data.homepage && (
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}><FaGlobe className={styles.icon} /> Website</span>
                                    <a href={data.homepage} target="_blank" rel="noopener noreferrer" className={styles.metaValue} style={{ color: 'var(--text-accent)' }}>
                                        Visit
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorInfo;