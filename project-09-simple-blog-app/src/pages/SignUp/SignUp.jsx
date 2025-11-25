import styles from './SignUp.module.css';

const SignUp = () => {
    return (
        <div className={styles.signup}>
            <h1>Sign Up</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
