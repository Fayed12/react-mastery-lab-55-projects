import styles from './PostList.module.css';
import PostCard from '../PostCard/PostCard';

const PostList = () => {
    // Placeholder data
    const posts = [
        { id: 1, title: 'First Post', content: 'This is the first post.' },
        { id: 2, title: 'Second Post', content: 'This is the second post.' },
    ];

    return (
        <div className={styles.postList}>
            {posts.map(post => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
