import styles from './CreatePostForm.module.css';

const CreatePostForm = () => {
    return (
        <form className={styles.form}>
            <h2>Create New Post</h2>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" className={styles.textarea}></textarea>
            </div>
            <button type="submit" className={styles.button}>Create Post</button>
        </form>
    );
};

export default CreatePostForm;
