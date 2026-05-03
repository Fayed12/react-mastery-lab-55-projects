// local
import MainInput from "../../../ui/input/MainInput";
import MainButton from "../../../ui/button/MainButton";
import styles from "./Login.module.css";
import signInWithFirebase from "../../../firebase/auth/firebaseLoginWithEmail";
import signInWithGoogle from "../../../firebase/auth/firebaseLoginWithGoogle";

// react form
import { useForm } from "react-hook-form";

// toast
import toast from "react-hot-toast";

// react
import { useEffect, useState } from "react";

// react router
import { NavLink } from "react-router";

// react icons
import { GiExitDoor } from "react-icons/gi";


function Login() {
    const [loading, setLoading] = useState(false);
    // const { userDetails } = useContext(UserContext);
    const {
        register,
        setFocus,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // handle submit data to login
    async function onsubmit(data) {
        // start with loading
        setLoading(true);
        toast.loading("loading...", { id: "login" });

        // await to sign in and load data
        await signInWithFirebase(data.email, data.password)

        // end loading
        setLoading(false);
        toast.success("login successful", { id: "login" });

        // set value
        setValue("email", "");
        setValue("password", "");
    }

    // handle google login
    async function handleGoogleLogin() {
        await signInWithGoogle();
    }

    // focus to email when open email
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    return (
        <div className={styles.allPage}>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <MainInput
                        type={"email"}
                        name={"email"}
                        placeholder={"your email..."}
                        title={"email address"}
                        register={register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                message:
                                    "please enter your email only in ex@gmail.com",
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="error">{errors.email.message}</p>
                    )}

                    <MainInput
                        type={"password"}
                        name={"password"}
                        placeholder={"your password..."}
                        title={"password"}
                        register={register("password", {
                            required: "password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character",
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="error">{errors.password.message}</p>
                    )}

                    <div>
                        <NavLink to="/forgotPassword">Forgot Password?</NavLink>
                    </div>

                    <MainButton
                        type="submit"
                        content="Login"
                        title="login"
                        isDisabled={loading}
                    />
                </form>
                <div className={styles.loginGoogle}>
                    <p onClick={() => handleGoogleLogin()}>login with google</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.backToHome}>
                        <NavLink to="/" replace={true} title="back to home">
                            <GiExitDoor size={20} />
                        </NavLink>
                    </div>
                    <div className={styles.signUp}>
                        <p>
                            don't have an account,{" "}
                            <NavLink to="/register" replace={true}>
                                register
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
