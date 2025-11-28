// local
import styles from './userDetails.module.css';
import getUserDetails from '../../../services/getUserDetails';

// react
import { useEffect, useState } from 'react';

// icons
import { FaEnvelope, FaPhone, FaInfoCircle, FaPenNib, FaTimes, FaUser } from 'react-icons/fa';

const UserDetails = ({ userId, onClose }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const userData = await getUserDetails(userId);
            setUser(userData);
            setLoading(false);
        };
        if (userId) fetch();
    }, [userId]);

    if (loading) return null; 

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <FaTimes />
                </button>

                <div className={styles.avatarContainer}>
                    {/* {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            <FaUser />
                        </div>
                    )} */}
                        <div className={styles.avatarPlaceholder}>
                            <FaUser />
                        </div>
                </div>

                <h2 className={styles.name}>{user?.name}</h2>

                <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                        <div className={styles.icon}><FaEnvelope /></div>
                        <div className={styles.infoText}>
                            <span className={styles.label}>Email</span>
                            <span className={styles.value}>{user?.email}</span>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.icon}><FaPhone /></div>
                        <div className={styles.infoText}>
                            <span className={styles.label}>Phone</span>
                            <span className={styles.value}>{user?.phone}</span>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.icon}><FaInfoCircle /></div>
                        <div className={styles.infoText}>
                            <span className={styles.label}>Bio</span>
                            <span className={styles.value}>{user?.bio}</span>
                        </div>
                    </div>

                    <div className={styles.infoItem}>
                        <div className={styles.icon}><FaPenNib /></div>
                        <div className={styles.infoText}>
                            <span className={styles.label}>Posts</span>
                            <span className={styles.value}>{user?.postsCount} Published</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;
