import styles from './EditPostForm.module.css';

const EditPostForm = () => {
    return (
        <form className={styles.form}>
            <h2>Edit Post</h2>
            <div className={styles.formGroup}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" className={styles.input} defaultValue="Existing Title" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" className={styles.textarea} defaultValue="Existing content..."></textarea>
            </div>
            <button type="submit" className={styles.button}>Update Post</button>
        </form>
    );
};

export default EditPostForm;
