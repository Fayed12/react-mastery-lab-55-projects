// local
import styles from './CreatePostForm.module.css';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';
import { userContext } from '../../../context/userContext';
import { userPostsContext } from '../../../context/userPostsContext';
import addNewPost from '../../../services/addNewPost';

// react router
import { useNavigate } from 'react-router';

// uuid
import { v4 as uuidv4 } from 'uuid';

// react hook form
import { useForm } from 'react-hook-form';

// react context
import { useContext } from 'react';

// react icons
import { FaPen, FaList, FaAlignLeft, FaPaperPlane, FaTimes } from 'react-icons/fa';

const CreatePostForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { user } = useContext(userContext);
    const { userPosts, setUserPosts } = useContext(userPostsContext);

    /*=======================================================================================================
                                        SUBMIT HANDLER 
    ======================================================================================================== */
    const onSubmit = (data) => {
        const newPost = {
            id: `post-${uuidv4().split('-')[0]}`,
            authorId: user.id,
            authorName: user.name,
            title: data.title,
            content: data.content,
            category: data.category,
            date: new Date().toISOString().split('T')[0],
            likes: [],
            comments: []
        };

        addNewPost(newPost);
        setUserPosts([...userPosts, newPost]);

        setTimeout(() => {
            navigate('/blog/profile', {replace: true});
        }, 1000);
    };

    /*=======================================================================================================
                                        RENDER 
    ======================================================================================================== */
    return (
        <div className={styles.container}>
            <div className={styles.formCard}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Post</h1>
                    <p className={styles.overview}>
                        Share your thoughts, tutorials, or experiences with the community.
                        Fill out the form below to publish your new blog post.
                    </p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaPen className={styles.icon} /> Post Title
                        </label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Enter an engaging title..."
                            register={register('title', { required: true })}
                        />
                        {errors.title && <p className="error">Title is required</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaList className={styles.icon} /> Category
                        </label>
                        <Input
                            name="category"
                            type="text"
                            placeholder="e.g., React, JavaScript, Lifestyle..."
                            register={register('category', { required: true })}
                        />
                        {errors.category && <p className="error">Category is required</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaAlignLeft className={styles.icon} /> Content
                        </label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Write your masterpiece here..."
                            {...register('content', { required: true })}
                        ></textarea>
                        {errors.content && <p className="error">Content is required</p>}
                    </div>

                    <div className={styles.actions}>
                        <Button
                            content={<><FaTimes style={{ marginRight: '10px' }} /> Cancel</>}
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => navigate('/blog/profile', {replace: true})}
                        />
                        <Button
                            content={<><FaPaperPlane style={{ marginRight: '10px' }} /> Publish Post</>}
                            type="submit"
                            className={styles.submitBtn}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePostForm;
