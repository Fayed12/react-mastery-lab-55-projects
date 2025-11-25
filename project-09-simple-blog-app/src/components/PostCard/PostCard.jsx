import styles from './PostCard.module.css';

const PostCard = ({ post }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>{post.title}</h2>
            <p className={styles.excerpt}>{post.content.substring(0, 100)}...</p>
            <a href={`/post/${post.id}`} className={styles.link}>Read More</a>
        </div>
    );
};

export default PostCard;
