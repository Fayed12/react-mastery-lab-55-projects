import styles from './Login.module.css';

const Login = () => {
    return (
        <div className={styles.login}>
            <h1>Login</h1>
            <form className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" className={styles.input} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" className={styles.input} />
                </div>
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;
