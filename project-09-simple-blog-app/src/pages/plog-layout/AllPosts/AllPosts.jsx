// local
import PostList from '../../../components/plog-layout/PostList/PostList';

// react router
import { useLoaderData } from 'react-router';

const AllPosts = () => {
    const posts = useLoaderData();
    return (
        <div >
            <PostList posts={posts} />
        </div>
    );
};

export default AllPosts;
