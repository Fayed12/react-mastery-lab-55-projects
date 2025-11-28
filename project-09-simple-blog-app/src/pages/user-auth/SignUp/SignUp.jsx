// react router
import { NavLink, useLoaderData, useNavigate } from 'react-router';

// react 
import { useEffect, useState } from 'react';

// react hook form
import { useForm } from 'react-hook-form';

// components
import Input from '../../../components/ui/input/input';
import Button from '../../../components/ui/button/button';
import addNewUser from '../../../services/addNewUser';
import Loading from "../../loading/loading"

// uuid
import { v4 as uuidv4 } from 'uuid';

// styles
import styles from './SignUp.module.css';
import toast from 'react-hot-toast';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset, setFocus } = useForm();
    const userData = useLoaderData();
    const [users, setUsers] = useState(userData);
    const [openLoading, setOpenLoading] = useState(false);
    const navigate = useNavigate();

    /*=====================================================================================================================
                                    MAIN FUNCTIONS
    =====================================================================================================================*/
    const onSubmit = async (data) => {

        // check if there is no exist user
        const user = users.some((user) => user.email.trim().toLowerCase() === data.email.trim().toLowerCase());
        if (user) {
            toast.error("User already exists", { id: "signup" });
            return;
        }

        // check if password and confirm password match
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords do not match", { id: "signup" });
            return;
        }

        // new user object
        const newUser = {
            id: uuidv4(),
            uniqueId: `USR-${uuidv4().split("-")[0].toUpperCase()}`,
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            avatar: "",
            bio: data.bio,
            postsCount: 0
        }

        // add new user
        const dataUser = await addNewUser(newUser);
        if (dataUser) {
            setUsers([...users, dataUser]);
        }

        // reset form
        reset({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            bio: ""
        });

        // navigate to login
        setOpenLoading(true);
        setTimeout(() => {
            setOpenLoading(false);
        }, 1200);
        setTimeout(() => {
            navigate("/login", { replace: true });
        }, 1000);
    };

    // focus name input
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    /*=====================================================================================================================
                                    RETURN
    =====================================================================================================================*/
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.signupCard}>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join us and start your journey</p>
                    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                        <Input
                            type="text"
                            id="name"
                            placeholder="your name"
                            register={register("name", {
                                required: "Name is required", pattern: {
                                    value: /^[A-Za-z]+( [A-Za-z]+)+$/
                                    , message: "Name must contain at least one space and two words without numbers or special characters"
                                }
                            })}
                        />
                        {errors.name && <p className="error" aria-label="name error">{errors.name.message}</p>}

                        <Input
                            type="text"
                            id="bio"
                            placeholder="ex: front-end Developer"
                            register={register("bio", { required: "Bio is required" })}
                        />
                        {errors.bio && <p className="error" aria-label="bio error">{errors.bio.message}</p>}

                        <Input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            register={register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: "Invalid email format, only email@gmail.com"
                                }
                            })}
                        />
                        {errors.email && <p className="error" aria-label="email error">{errors.email.message}</p>}

                        <Input name="phone" type="tel" placeholder="Phone Number" register={{ ...register("phone", { required: "Phone is required", pattern: { value: /^01[0-9]{9}$/, message: "Phone number must be 11 digits and start with 01" } }) }} />
                        {errors.phone && <p className="error" aria-label="phone error">{errors.phone.message}</p>}

                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            register={register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" } })}
                        />
                        {errors.password && <p className="error" aria-label="password error">{errors.password.message}</p>}

                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            register={register("confirmPassword", { required: "Confirm Password is required" })}
                        />
                        {errors.confirmPassword && <p className="error" aria-label="confirm password error">{errors.confirmPassword.message}</p>}

                        <Button type="submit" content="Sign Up" />

                        <div className={styles.loginLink}>
                            Already have an account? <NavLink to="/login" className={styles.link} replace={true}>Log in</NavLink>
                        </div>
                    </form>
                </div>
            </div>
            <Loading open={openLoading} />
        </>
    );
};

export default SignUp;
