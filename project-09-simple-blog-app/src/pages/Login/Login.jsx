// react router
import { NavLink } from 'react-router';

// react hook form
import { useForm } from 'react-hook-form';

// components
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';

// styles
import styles from './Login.module.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle login logic here
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.loginContainer}>
                <div className={styles.imageSide}>
                    <img src="/login.png" alt="Login Visual" className={styles.loginImage} />
                </div>
                <div className={styles.formSide}>
                    <div className={styles.loginCard}>
                        <h1 className={styles.title}>Welcome Back</h1>
                        <p className={styles.subtitle}>start your journey with us</p>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <Input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="email@example.com"
                                register={register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: "Invalid email format, only email@gmail.com" } })}
                            />
                            {errors.email && <p className="error">{errors.email.message}</p>}

                            <Input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="password"
                                register={register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}

                            <div className={styles.actionsGroup}>
                                <div className={styles.forgotPassword}>
                                    <NavLink to="#" className={styles.link}>Forgot Password?</NavLink>
                                </div>

                                <Button type="submit" content={"Sign In"} />

                                <div className={styles.signupLink}>
                                    Don't have an account? <NavLink to="/signUp" className={styles.link}>Sign up</NavLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
