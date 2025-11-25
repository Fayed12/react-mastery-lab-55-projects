import styles from './PostDetails.module.css';

const PostDetails = () => {
    return (
        <div className={styles.details}>
            <h1 className={styles.title}>Post Title</h1>
            <p className={styles.content}>Full content of the post goes here...</p>
        </div>
    );
};

export default PostDetails;
