// local
import styles from './Login.module.css';
import MainInput from '../../../components/ui/input/mainInput';
import MainButton from "../../../components/ui/button/mainButton"
import { firebaseLogin } from '../../../fierbase-services/login';
import { loginWithGoogle } from '../../../fierbase-services/loginGoogle';
import { MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import Loading from "../../loading/loading"
import updateUserField from '../../../fierbase-services/fireStore/updateValueInUsers';

// react router
import { Link, useNavigate } from 'react-router';

// react hook form
import { useForm } from 'react-hook-form';

// react
import { useEffect, useState } from 'react';

// toast
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/authSlice';

const Login = () => {
    const navigate = useNavigate();
    const [openLoading, setOpenLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm();

    const user = useSelector(selectUser);

    // handle submit login
    const onSubmit = (data) => {
        toast.loading("Logging in...", { id: "login" });
        setTimeout(async () => {
            const newUser = await firebaseLogin(data.email, data.password);
            if (newUser.user.uid) {
                await updateUserField(newUser.user.uid, { online: true });
                toast.success("Login successful", { id: "login" });
                navigate("/homeChats", { replace: true });
            }
        }, 1000);
    }

    // handle login with google 
    const handleLoginWithGoogle = (e) => {
        e.preventDefault();
        try {
            toast.loading("Logging in...", { id: "login" });
            setTimeout(async () => {
                const newUser = await loginWithGoogle();
                if (newUser.uid) {
                    await updateUserField(newUser.uid, { online: true });
                    toast.success("Login successful", { id: "login" });
                    navigate("/homeChats", { replace: true });
                }
            }, 1000);
        } catch (error) {
            toast.error("Login failed", { id: "login" });
            console.log(error);
        }
    }

    // focus to the email input
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);

    // redirect if he is already logged in
    useEffect(() => {
        if (user) {
            const timer1 = setTimeout(() => {
                setOpenLoading(true);
            }, 0);
            const timer2 = setTimeout(() => {
                navigate("/homeChats", { replace: true })
            }, 2000);
            const timer3 = setTimeout(() => {
                setOpenLoading(false);
            }, 2000);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            }
        }
    }, [navigate, user]);
    return (
        <>
        <div className={styles.container}>
            <div className={styles.header}>
                <p>welcome back</p>
            </div>
            <div className={styles.form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MainInput
                        type="email"
                        placeholder="your email..."
                        name="email"
                        register={register("email", { required: "email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@gmail\.com$/, message: "email must be end with @gmail.com" } })}
                        icon={MdEmail}
                    />
                    {errors.email && <p className='error'>{errors.email.message}</p>}
                    <MainInput
                        type="password"
                        placeholder="your password..."
                        name="password"
                        register={register("password", { required: "password is required" })}
                        icon={MdLock}
                    />
                    {errors.password && <p className='error'>{errors.password.message}</p>}

                    <div className={styles.foregtPassword}>
                        <Link to="/forgotPassword">forgot password?</Link>
                    </div>

                    <MainButton type="submit" title="Login" children="login" />

                    <div className={styles.googleLogin}>
                        <p>or login with google</p>
                        <MainButton
                            type="button"
                            title="Login with Google"
                            children={<span><FcGoogle size={15} /> Login with Google</span>}
                            onclick={handleLoginWithGoogle}
                        />
                    </div>
                </form>

                <div className={styles.formFooter}>
                    <p>don't have an account?</p>
                    <Link to="/register">register</Link>
                </div>
            </div>
            </div>
            {openLoading && <Loading />}
        </>
    );
};

export default Login;
