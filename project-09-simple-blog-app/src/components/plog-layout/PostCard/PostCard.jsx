// local
import styles from "./PostCard.module.css";
import Button from "../../ui/Button/Button";
import Input from "../../ui/Input/Input";
import addNewComment from "../../../services/addNewComment";
import addRemoveLikeFromPost from "../../../services/addLikeToPost";
import { userContext } from "../../../context/userContext";

// uuid
import { v4 as uuidv4 } from "uuid";

// react 
import { useEffect, useRef, useState, useContext } from "react";

// react hook form
import { useForm } from "react-hook-form";

// react icons
import { FaEllipsisH, FaHeart, FaRegHeart, FaComment } from "react-icons/fa";


const PostCard = ({ postFromList, setPostsList }) => {
    const { register, handleSubmit, setFocus, formState: { errors }, reset } = useForm();
    const [isReadMore, setIsReadMore] = useState(false);
    const [showReadMore, setShowReadMore] = useState(false);
    const [post, setPost] = useState(postFromList);
    const { user } = useContext(userContext);
    const [isLiked, setIsLiked] = useState(post.likes.includes(user.id));
    const contentRef = useRef(null);

    /* ====================================================================================================
                            handle love to post
    ==================================================================================================== */
    function handleLoveToPost() {
        if (!isLiked) {
            setIsLiked(true);
            setPost({ ...post, likes: [...post.likes, user.id] });
            addRemoveLikeFromPost(post.id, user.id, true)
        } else {
            setIsLiked(false);
            setPost({ ...post, likes: post.likes.filter((id) => id !== user.id) });
            addRemoveLikeFromPost(post.id, user.id, false)
        }
    }
    
    /* ====================================================================================================
                                focus to comment section
    ==================================================================================================== */
    function handlefocusToComment() {
        setFocus("comment");
    }

    /* ====================================================================================================
                                add comment to post
    ==================================================================================================== */
    function handleAddComment(data) {
        const newComment = {
            id: `cmt-${uuidv4().split("-").at(0)}`,
            userId: user.id,
            content: data.comment,
            date: new Date().toISOString().split("T").at(0),
        }
        addNewComment(post.id, newComment);
        setPost({ ...post, comments: [...post.comments, newComment] });
        reset({ comment: "" });
        handlefocusToComment();
    }

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
                        <div className={styles.menuOptions}>
                            {/* if this post is my post , then i can [edit, delete, get details, hidden it], if not my post then can only [get details, hidden it] */}
                        </div>
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
                            {post?.likes?.length}
                            <Button
                                className={styles.actionBtn}
                                content={
                                    <>
                                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                                    </>
                                }
                                onClick={handleLoveToPost}
                            />
                        </span>
                        <span className={styles.stat}>
                            {post?.comments?.length}
                            <Button
                                onClick={handlefocusToComment}
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
                    <form onSubmit={handleSubmit(handleAddComment)} className={styles.commentForm}>
                        <Input
                            name="comment"
                            type="text"
                            placeholder="Add a comment..."
                            register={register("comment", { required: "write any thing and comment it" })}
                        />
                        <Button className={styles.postBtn} content="Post" type="submit" />
                        {errors.comment && <p className={styles.commentError}>{errors.comment.message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
