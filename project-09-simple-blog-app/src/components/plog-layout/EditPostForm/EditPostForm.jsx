// local
import styles from './EditPostForm.module.css';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import updatePost from '../../../services/updatePost';

// react hook form
import { useForm } from 'react-hook-form';

// react icons
import { FaTimes, FaPen, FaList, FaAlignLeft } from 'react-icons/fa';

const EditPostForm = ({ onClose, post, setPost }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // main function to submit form
    const onSubmit = (data) => {
        console.log(data);

        // ubdate post
        const updatedPost = {
            ...post,
            date: new Date().toISOString().split('T')[0],
            title: data.title,
            category: data.category,
            content: data.content,
        };
        setPost(updatedPost);
        setTimeout(() => {
            updatePost(post.id, updatedPost);
            reset({ title: '', category: '', content: '' });
            onClose();
        }, 1000);
    };
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Edit Post</h2>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}><FaPen /> Title</label>
                        <Input
                            name="title"
                            type="text"
                            placeholder="Enter post title..."
                            register={register('title', { required: true, value: post.title })}
                        />
                        {errors.title && <p className="error">Title is required</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}><FaList /> Category</label>
                        <Input
                            name="category"
                            type="text"
                            placeholder="Enter post category..."
                            register={register('category', { required: true, value: post.category })}
                        />
                        {errors.category && <p className="error">Category is required</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}><FaAlignLeft /> Content</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Write your post content here..."
                            {...register('content', { required: true, value: post.content })}
                        ></textarea>
                        {errors.content && <p className="error">Content is required</p>}
                    </div>

                    <div className={styles.actions}>
                        <Button
                            content="Update Post"
                            type="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPostForm;
