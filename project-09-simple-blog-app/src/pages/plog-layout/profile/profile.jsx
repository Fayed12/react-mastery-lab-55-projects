// local
import styles from './profile.module.css';
import Button from '../../../components/ui/Button/Button';
import PostList from '../../../components/plog-layout/PostList/PostList';
import { userContext } from '../../../context/userContext';
import { userPostsContext } from '../../../context/userPostsContext';
import Loading from '../../loading/Loading';

// react router
import { useLoaderData, useNavigate } from 'react-router';

// react
import { useContext, useEffect, useState } from 'react';

// react icons
import { FaUser, FaPlus } from 'react-icons/fa';

const Profile = () => {
    const [openLoading, setOpenLoading] = useState(false)
    const { user } = useContext(userContext);
    const { userPosts, setUserPosts } = useContext(userPostsContext);
    const posts = useLoaderData();
    const navigate = useNavigate();

    useEffect(() => {
        setUserPosts(posts.filter(post => post.authorId === user?.id));
    }, [posts, setUserPosts, user?.id])

    // navigate to create post
    const navigateToCreatePost = () => {
        setOpenLoading(true)
        setTimeout(() => {
            setOpenLoading(false)
        }, 1200)
        setTimeout(() => {
            navigate('/blog/createPost');
        }, 1200)
    }
    return (
        <>
            <div className={styles.container}>
                {/* Top Banner */}
                <div className={styles.banner}></div>

                {/* Profile Header */}
                <div className={styles.profileHeader}>
                    <div className={styles.avatarContainer}>
                        <FaUser className={styles.avatarIcon} />
                    </div>

                    <div className={styles.userInfo}>
                        <h1 className={styles.userName}>{user?.name}</h1>
                        <p className={styles.userBio}>{user?.bio}</p>
                    </div>

                    <div className={styles.actions}>
                        <Button
                            content={<><FaPlus style={{ marginRight: '8px' }} /> Create New Plog Post</>}
                            className={styles.createPostBtn}
                            onClick={navigateToCreatePost}
                        />
                    </div>
                </div>

                {/* Posts Section */}
                <div className={styles.postsSection}>
                    <h2 className={styles.sectionTitle}>My plogs:</h2>
                    <PostList posts={userPosts} />
                </div>
            </div>
            {openLoading && <Loading />}
        </>
    );
};

export default Profile;