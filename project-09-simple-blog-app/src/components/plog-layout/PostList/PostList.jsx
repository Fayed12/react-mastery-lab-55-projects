// local
import styles from './PostList.module.css';
import PostCard from '../PostCard/PostCard';

// react
import { useState } from 'react';

const PostList = ({ posts }) => {
    const [postsList, setPostsList] = useState(posts);
    return (
        <div className={styles.postList}>
            {postsList.map(post => (
                <PostCard key={post.id} postFromList={post} setPostsList={setPostsList}/>
            ))}
        </div>
    );
};

export default PostList;
