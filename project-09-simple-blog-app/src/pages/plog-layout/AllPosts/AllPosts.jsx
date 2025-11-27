import styles from './AllPosts.module.css';
import PostList from '../../../components/plog-layout/PostList/PostList';

const AllPosts = () => {
    return (
        <div className={styles.allPosts}>
            <h1>All Posts</h1>
            <PostList />
        </div>
    );
};

export default AllPosts;
