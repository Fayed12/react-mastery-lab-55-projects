// react router
import { NavLink } from 'react-router';

// react hook form
import { useForm } from 'react-hook-form';

// components
import Input from '../../components/ui/input/input';
import Button from '../../components/ui/button/button';

// styles
import styles from './SignUp.module.css';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle signup logic here
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.signupCard}>
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join us and start your journey</p>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

                        <Input
                            type="text"
                            id="username"
                            placeholder="Username"
                            register={register("username", { required: "Username is required" })}
                        />
                        {errors.username && <p className="error">{errors.username.message}</p>}

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
                        {errors.email && <p className="error">{errors.email.message}</p>}

                        <Input name="phone" type="tel" placeholder="Phone Number" register={{ ...register("phone", { required: "Phone is required", pattern: { value: /^01[0-9]{9}$/, message: "Phone number must be 11 digits and start with 01" } }) }} />
                        {errors.phone && <p className="error">{errors.phone.message}</p>}

                        <Input
                            type="password"
                            id="password"
                            placeholder="Password"
                            register={register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" }, pattern: { value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" } })}
                        />
                        {errors.password && <p className="error">{errors.password.message}</p>}

                        <Input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            register={register("confirmPassword", { required: "Confirm Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                        />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

                    <Button type="submit" content="Sign Up" />

                    <div className={styles.loginLink}>
                        Already have an account? <NavLink to="/login" className={styles.link}>Log in</NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
