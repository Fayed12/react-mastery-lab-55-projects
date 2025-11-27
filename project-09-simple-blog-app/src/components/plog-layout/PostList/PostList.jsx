// local
import styles from './PostList.module.css';
import PostCard from '../PostCard/PostCard';

const PostList = ({ posts }) => {
    return (
        <div className={styles.postList}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
