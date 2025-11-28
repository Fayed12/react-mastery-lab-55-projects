// local
import styles from './PostDetails.module.css';
import Button from '../../../components/ui/Button/Button';
import UserDetails from '../../../components/plog-layout/userDetails/userDetails';

// react router
import { useLoaderData, useNavigate } from 'react-router';

// react icons
import { FaHeart, FaComment, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { RxAvatar } from "react-icons/rx";

// react
import { useState } from 'react';

const PostDetails = () => {
    const post = useLoaderData()
    const navigate = useNavigate()
    const [openUserDetials, setOpenUserDetials] = useState(false)

    // handle user details
    const handleUserDetails = () => {
        setOpenUserDetials(!openUserDetials)
    }

    if (!post) {
        return <div className={styles.container}><h1 className={styles.title}>Loading...</h1></div>;
    } else {
        return (
            <>
                <div className={styles.container}>
                    {/* Main Post Card */}
                    <div className={styles.card}>
                        <div className={styles.header}>
                            <div className={styles.titleSection}>
                                <h1 className={styles.title}>{post[0]?.title}</h1>
                                <div className={styles.metaInfo}>
                                    <span className={styles.author} onClick={handleUserDetails}>
                                        <FaUser /> {post[0]?.authorName}
                                    </span>
                                    <span className={styles.date}>
                                        <FaCalendarAlt /> {post[0]?.date}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.categoryWrapper}>
                                <span className={styles.category}>{post[0]?.category}</span>
                            </div>
                        </div>

                        <div className={styles.content}>
                            <p>{post[0]?.content}</p>
                        </div>

                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <FaHeart className={styles.icon} />
                                <span>{post[0]?.likes?.length} Likes</span>
                            </div>
                            <div className={styles.statItem}>
                                <FaComment className={styles.icon} />
                                <span>{post[0]?.comments?.length} Comments</span>
                            </div>
                        </div>

                        <div className={styles.footerId}>
                            ID: {post[0]?.id}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className={styles.commentsContainer}>
                        <h2 className={styles.commentsHeader}>Comments ({post[0]?.comments?.length})</h2>
                        <div className={styles.commentsList}>
                            {post[0]?.comments?.map((comment) => (
                                <div key={comment.id} className={styles.commentCard}>
                                    <div className={styles.commentHeader}>
                                        <div className={styles.commentAuthor}>
                                            <span><RxAvatar /></span>
                                            <span>{comment.userName || "User"}</span>
                                        </div>
                                        <span className={styles.commentDate}>{comment.date}</span>
                                    </div>
                                    <p className={styles.commentContent}>{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.backButton}>
                    <Button content={"Back"} onClick={() => navigate(-1)} type="button" />
                </div>
                {openUserDetials && <UserDetails userId={post[0]?.authorId} onClose={handleUserDetails} />}
            </>
        );
    }

};

export default PostDetails;
