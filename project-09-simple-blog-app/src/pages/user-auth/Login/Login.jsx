// react router
import { NavLink, useLoaderData } from 'react-router';

// react hook form
import { useForm } from 'react-hook-form';

// react 
import { useContext } from 'react';

// components
import Input from '../../../components/ui/input/input';
import Button from '../../../components/ui/button/button';
import { userContext } from '../../../context/userContext';

// react icons
import { TiArrowBack } from "react-icons/ti";

// toast
import toast from 'react-hot-toast';

// styles
import styles from './Login.module.css';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userData = useLoaderData();
    const { setUser, setIsLogin } = useContext(userContext);

    /*=====================================================================================================================
                                MAIN FUNCTIONS
    =====================================================================================================================*/
    const onSubmit = (data) => {
        // console.log(data);

        // check matched user
        // 1- check email
        const matchedUser = userData.find(user => user.email === data.email);
        if (matchedUser) {
            // 2- check password
            if (matchedUser.password === data.password) {
                toast.loading("Logging in...", { id: "login" });
                setTimeout(() => {
                    setUser(matchedUser);
                    setIsLogin(true);

                    // save user data in session storage or local storage based on remember me checkbox
                    if (!data.rememberMe) {
                        sessionStorage.setItem("user", JSON.stringify(matchedUser));
                        sessionStorage.setItem("isLogin", "true");
                    } else {
                        localStorage.setItem("user", JSON.stringify(matchedUser));
                        localStorage.setItem("isLogin", "true");
                    }
                    toast.success("Login successful", { id: "login" });
                }, 1500);
            } else {
                toast.error("Login failed", { id: "login" });
            }
        } else {
            toast.error("User not found", { id: "login" });
        }
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
                                <div className={styles.formOptions}>
                                    <label className={styles.rememberMe}>
                                        <Input
                                            type="checkbox"
                                            id="rememberMe"
                                            name="rememberMe"
                                            register={register("rememberMe")}
                                        />
                                        Remember me
                                    </label>
                                    <div className={styles.forgotPassword}>
                                        <NavLink to="/forgotPassword" className={styles.link} replace={true}>Forgot Password?</NavLink>
                                    </div>
                                </div>

                                <Button type="submit" content={"Sign In"} />

                                <div className={styles.signupLink}>
                                    Don't have an account? <NavLink to="/signUp" className={styles.link} replace={true}>Sign up</NavLink>
                                </div>
                                <div className={styles.backHomeLink} aria-label="back to home">
                                    <NavLink to="/" className={styles.link} replace={true}><span title='back to home'><TiArrowBack /></span></NavLink>
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
