// react router
import { NavLink, useLoaderData,useNavigate } from 'react-router';

// react hook form
import { useForm } from 'react-hook-form';

// components
import Input from '../../../components/ui/input/input';
import Button from '../../../components/ui/button/button';
import { API_ROUTES } from '../../../../config';

// styles
import styles from './ForgotPassword.module.css';

// toast
import toast from 'react-hot-toast';

// axios
import axios from 'axios';

// react 
import { useState } from 'react';

// react icons
import { TiArrowBack } from "react-icons/ti";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const userData = useLoaderData();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    // if email is not correct or not found in database, isCorrect will be false otherwise true, go to update password
    const [isCorrect, setIsCorrect] = useState(false);

    // email checker function 
    function submitEmail(data) {
        const user = userData.find(user => user.email === data.email);
        if (user) {
            toast.loading("Loading..." ,{id:"forgotPassword"});
            setTimeout(() => {
                toast.success("Email is correct", { id: "forgotPassword" });
                setUser(user);
                setIsCorrect(true);
            }, 1500);
        } else {
            toast.error("user not found", {id:"forgotPassword"});
        }
    }

    // password update function 
    async function submitPassword(data) {
        const { password, confirmPassword} = data;
        if (password !== confirmPassword) {
            toast.error("Password does not match", {id:"forgotPassword"});
            return;
        }
        
        try {
            toast.loading("Loading..." ,{id:"forgotPassword"});
            setTimeout(async () => {
                const res =await axios.patch(`${API_ROUTES.users}/${user.id}`, { password });
                toast.success("Password updated successfully", { id: "forgotPassword" });
                setIsCorrect(false);
                setUser(null);
                navigate("/login", { replace: true });
                return res.data
            }, 1500);
        } catch (error) {
            toast.error("Something went wrong", { id: "forgotPassword" });
            console.log(error);
        }
    }


    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>{!isCorrect ? "Check Email" : "Update Password"}</h1>

                <div className={styles.content}>
                    {!isCorrect ? (
                        <div className={styles.emailSection}>
                            <form className={styles.form} onSubmit={handleSubmit(submitEmail)}>
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    register={register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: "Invalid email format, only email@gmail.com" } })}
                                />
                                {errors.email && <p className="error">{errors.email.message}</p>}

                                <Button content="Check Email" className={styles.checkBtn} aria-label="Check Email" title='Check Email' />

                            </form>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit(submitPassword)}>
                            <Input
                                type="password"
                                placeholder="New Password"
                                name="password"
                                    register={register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" } })}
                            />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                            <Input
                                type="password"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                register={register("confirmPassword", { required: "Confirm Password is required" })}
                            />
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

                            <Button content="Update Password" className={styles.updateBtn} aria-label="Update Password" title='Update Password' />
                        </form>
                    )}
                    <div className={styles.leftAction} aria-label="Back to Login" title='Back to Login'>
                        <NavLink to="/login" className={styles.backLink} replace={true}>
                            <TiArrowBack />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
