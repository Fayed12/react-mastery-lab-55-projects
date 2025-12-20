// local
import MainButton from "../../../ui/button/mainButton";
import MainInput from "../../../ui/input/mainInput";
import styles from "./signUp.module.css";
import createUserWithEmail from "../../../firebase/firebaseSignUp";

// react form
import { useForm } from "react-hook-form";

// react
import { useState, useEffect } from "react";

// toast
import toast from "react-hot-toast";

// react router
import { NavLink, useNavigate } from "react-router";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const {
        register,
        setFocus,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    // watch password to match it with confirm one
    // eslint-disable-next-line react-hooks/incompatible-library
    const watchedPass = watch("password");

    // handle submit data to signUp
    function onsubmit(data) {
        // start with loading
        setLoading(true);
        toast.loading("loading...", { id: "login" });

        // end loading and save value
        setTimeout(async () => {
            // main signUp functions
            const userData = {
                name: data.name,
                userName: data.userName,
                address: data.address,
                phone: data.phone,
                email: data.email,
                createdAt: new Date().toISOString(),
                favMovies: [],
                favTvShows: [],
            };
            const password = data.password;
            const email = data.email;
            if (password && email) {
                await createUserWithEmail({userData, email, password});
            }

            // set value
            setValue("email", "");
            setValue("password", "");
            setValue("name", "");
            setValue("userName", "");
            setValue("address", "");
            setValue("phone", "");
            setValue("confirmPassword", "");
        }, 1500);

        // navigate to login now
        setTimeout(() => {
            navigate("/login", { replace: true });
            setLoading(false);
            toast.success("ed", { id: "login" });
        }, 1600);
    }

    // focus to email when open email
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    return (
        <>
            <div className={styles.allSignUpPage}>
                <div className={styles.SignUpForm}>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <MainInput
                            type={"text"}
                            name={"name"}
                            placeholder={"your name..."}
                            title={"name"}
                            register={register("name", {
                                required: "name is required",
                                pattern: {
                                    value: /^[A-Za-z]{2,}(?:\s[A-Za-z]{2,})+$/,
                                    message:
                                        "Please enter at least two words for full name",
                                },
                            })}
                        />
                        {errors.name && (
                            <p className="error">{errors.name.message}</p>
                        )}

                        <MainInput
                            type={"text"}
                            name={"userName"}
                            placeholder={"your userName..."}
                            title={"userName"}
                            register={register("userName", {
                                required: "userName is required",
                                pattern: {
                                    value: /^[A-Za-z]{2,}$/,
                                    message:
                                        "Please enter only one word for first name",
                                },
                            })}
                        />
                        {errors.userName && (
                            <p className="error">{errors.userName.message}</p>
                        )}

                        <MainInput
                            type={"text"}
                            name={"address"}
                            placeholder={"your address..."}
                            title={"address"}
                            register={register("address", {
                                required: "address is required",
                            })}
                        />
                        {errors.address && (
                            <p className="error">{errors.address.message}</p>
                        )}

                        <MainInput
                            type={"tel"}
                            name={"phone"}
                            placeholder={"your phone..."}
                            title={"phone"}
                            register={register("phone", {
                                required: "phone is required",
                                pattern: {
                                    value: /^(010|011|012|015)[0-9]{8}$/,
                                    message:
                                        "Please enter a valid Egyptian mobile number (11 digits)",
                                },
                            })}
                        />
                        {errors.phone && (
                            <p className="error">{errors.phone.message}</p>
                        )}

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

                        <MainInput
                            type={"password"}
                            name={"confirmPassword"}
                            placeholder={"your confirm password..."}
                            title={"confirm password"}
                            register={register("confirmPassword", {
                                required: "confirm password is required",
                                validate: {
                                    matchPassword: (value) =>
                                        value === watchedPass ||
                                        "Passwords do not match",
                                },
                            })}
                        />
                        {errors.confirmPassword && (
                            <p className="error">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                        <MainButton
                            type="submit"
                            content="SignUp"
                            title="login"
                            isDisabled={loading}
                        />
                    </form>

                    <div className={styles.signUp}>
                        <p>
                            have an account,{" "}
                            <NavLink to="/login" replace={true}>
                                Login
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;

// Ahmed@12