// local
import styles from './Signup.module.css';
import MainInput from '../../../components/ui/input/mainInput';
import MainButton from '../../../components/ui/button/mainButton';
import { firebaseSignUp } from '../../../fierbase-services/signUp';
import { FaUser, FaIdCard, FaGlobe, FaPhone } from "react-icons/fa";
import { MdEmail, MdLock } from "react-icons/md";

// react hook form
import { useForm } from 'react-hook-form';

// react
import { useEffect } from 'react';

// toast
import toast from 'react-hot-toast';

// react router
import { Link,useNavigate } from 'react-router';

const Signup = () => {
    const { register, handleSubmit, formState: { errors }, setFocus, watch, reset } = useForm();
    const navigate = useNavigate();

    // handle submit
    const onSubmit = (data) => {
        const newUser = {
            country: data.country,
            displayName: data.displayName,
            email: data.email,
            phone: data.phone,
            userName: data.userName,
            contactedUsers: []
        }
        toast.loading("Creating user...", { id: "create-user" });
        setTimeout(async () => {
            await firebaseSignUp({ newUser, password: data.password })
            toast.success("User created successfully", { id: "create-user" });
            navigate("/login" , {replace: true});
            reset();
        }, 1000);
    };

    // watch the password
    // eslint-disable-next-line react-hooks/incompatible-library
    const password = watch("password");

    // focus to the name input
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Signup</h1>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MainInput
                        type="text"
                        placeholder="your name..."
                        name="userName"
                        register={register("userName", {
                            required: "user name is required", pattern: {
                                value: /^[A-Za-z]{2,}(?:\s+[A-Za-z]{2,})+$/,
                                message: "user name must be at least 2 words"
                            }
                        })}
                        icon={FaUser}
                    />
                    {errors.userName && <p className='error'>{errors.userName.message}</p>}

                    <MainInput
                        type="text"
                        placeholder="display name..."
                        name="displayName"
                        register={register("displayName", {
                            required: "display name is required", pattern: {
                                value: /^[A-Za-z0-9_]+$/,
                                message: "display name must be at least one word and can't contain special characters"
                            }
                        })}
                        icon={FaIdCard}
                    />
                    {errors.displayName && <p className='error'>{errors.displayName.message}</p>}

                    <MainInput
                        type="text"
                        placeholder="your country..."
                        name="country"
                        register={register("country", {
                            required: "country is required"
                        })}
                        icon={FaGlobe}
                    />
                    {errors.country && <p className='error'>{errors.country.message}</p>}

                    <MainInput
                        type="tel"
                        placeholder="your phone..."
                        name="phone"
                        register={register("phone", {
                            required: "phone is required",
                            pattern: {
                                value: /^(?:\+20|0)?1[0125][0-9]{8}$/,
                                message: "phone must be 11 digits and start with 0 or +20"
                            }
                        })}
                        icon={FaPhone}
                    />
                    {errors.phone && <p className='error'>{errors.phone.message}</p>}

                    <MainInput
                        type="email"
                        placeholder="your email..."
                        name="email"
                        register={register("email", {
                            required: "email is required", pattern: {
                                value: /^[A-Za-z0-9._%+-]+@gmail\.com$/,
                                message: "email must be end with @gmail.com"
                            }
                        })}
                        icon={MdEmail}
                    />
                    {errors.email && <p className='error'>{errors.email.message}</p>}

                    <MainInput
                        type="password"
                        placeholder="your password..."
                        name="password"
                        register={register("password", {
                            required: "password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                            },
                        })}
                        icon={MdLock}
                    />
                    {errors.password && <p className='error'>{errors.password.message}</p>}

                    <MainInput
                        type="password"
                        placeholder="confirm password..."
                        name="confirmPassword"
                        register={register("confirmPassword", {
                            required: "confirm password is required",
                            validate: {
                                matchPassword: (value) => value === password || "Passwords do not match",
                            },
                        })}
                        icon={MdLock}
                    />
                    {errors.confirmPassword && <p className='error'>{errors.confirmPassword.message}</p>}

                    <MainButton type="submit" title="Signup" children="Signup" />
                </form>
                <div className={styles.formFooter}>
                    <p>Already have an account?</p>
                    <Link to="/login"replace={true}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

// mosa!m@sM1
// Hoda@h123
// mariam1@mM
// Jouda@j123