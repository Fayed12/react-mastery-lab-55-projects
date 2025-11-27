// local
import styles from "./PostCard.module.css";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";

// react 
import { useEffect, useRef, useState } from "react";

// react icons
import { FaEllipsisH, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";

const PostCard = ({ post }) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const contentRef = useRef(null);

    /* ====================================================================================================
                                    check if content is more than 3 lines
    ==================================================================================================== */
    useEffect(() => {
        if (contentRef.current) {
            const el = contentRef.current;
            const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
            const maxLinesHeight = lineHeight * 3;
            if (el.scrollHeight > maxLinesHeight) {
                setTimeout(() => setShowReadMore(true), 0);
            }
        }
    }, [post?.content]);
    
    /* ====================================================================================================
                                            render post card
    ==================================================================================================== */    
    return (
        <div className={styles.cardContainer}>
            <div className={styles.card}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {`${post?.authorName.split(" ").at(0)[0]?.toUpperCase()}${post?.authorName.split(" ").at(-1)[0]?.toUpperCase()}`}
                        </div>
                        <div className={styles.userMeta}>
                            <span className={styles.username}>
                                {post?.authorName}
                            </span>
                            <span className={styles.timestamp}>
                                {post?.date}
                            </span>
                        </div>
                    </div>
                    <div className={styles.menu}>
                        <FaEllipsisH />
                    </div>
                </div>

                {/* Body */}
                <div className={styles.body}>
                    <div className={styles.title}><p>{post?.title}:</p></div>
                    <p ref={contentRef} className={styles.content} style={{ display: isReadMore ? "block" : "-webkit-box"}} onClick={() => isReadMore && setIsReadMore(false)}>{post?.content}</p>
                    {showReadMore && !isReadMore && (
                        <span className={styles.readMore} onClick={() => setIsReadMore(true)}>Read More</span>
                    )}
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <div className={styles.stats}>
                        <span className={styles.stat}>
                            {post?.likes}
                            <Button
                                className={styles.actionBtn}
                                content={
                                    <>
                                        <FaRegHeart />
                                    </>
                                }
                            />
                        </span>
                        <span className={styles.stat}>
                            {post?.comments?.length}
                            <Button
                                className={styles.actionBtn}
                                content={
                                    <>
                                        <FaComment />
                                    </>
                                }
                            />
                        </span>
                    </div>
                    <div className={styles.category} aria-label="category"><p title="category">{post?.category}</p></div>
                </div>
            </div>

            {/* Comments Section */}
            <div className={styles.commentsSection}>
                <div className={styles.commentInput}>
                    <Input
                        name="comment"
                        type="text"
                        placeholder="Add a comment..."
                    />
                    <Button className={styles.postBtn} content="Post" />
                </div>
            </div>
        </div>
    );
};

export default PostCard;
