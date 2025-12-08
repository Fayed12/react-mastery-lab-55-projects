// local
import styles from './forgotPassword.module.css';
import MainInput from '../../../components/ui/input/mainInput';
import MainButton from '../../../components/ui/button/mainButton';
import resetPassword from '../../../fierbase-services/FirebaseforgotPassword';
import { selectUser } from '../../../redux/authSlice'
import { MdEmail } from "react-icons/md";

// redux
import { useSelector } from 'react-redux';

// react hook form
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

// toast
import toast from 'react-hot-toast';
import { Link } from 'react-router';

function ForgotPassword() {
    const user = useSelector(selectUser);
    const [isSend, setIsSend] = useState(false);
    const { register, handleSubmit, formState: { errors }, setFocus } = useForm();

    // handle submit
    const onSubmit = (data) => {
        toast.loading("loading...", { id: "reset-password" });
        setTimeout(async () => {
            const { success, message } = await resetPassword(data.email);
            if (success) {
                toast.success("email sent, check your email", { id: "reset-password" });
                setIsSend(true);
            } else {
                toast.error(message, { id: "reset-password" });
            }
        }, 1000);
    }

    // focus to the email input
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);
    return (
        <div className={styles.ForgotPasswordContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isSend ? (
                    <>
                        <p>email sent,check your email or spam</p>
                        <MainButton type="submit" title="Forgot Password" children="Resend email" onclick={(e) => { e.preventDefault(); setIsSend(false) }} />
                    </>
                ) : (
                    <>
                        <MainInput
                            type="email"
                            placeholder="your email..."
                            defaultValue={user?.email}
                            name="email"
                            register={register("email", { required: "email is required", pattern: { value: /^[A-Za-z0-9._%+-]+@gmail\.com$/, message: "email must be end with @gmail.com" } })}
                            icon={MdEmail}
                        />
                        {errors.email && <p className='error'>{errors.email.message}</p>}
                        <MainButton type="submit" title="Forgot Password" children="send email" />
                    </>
                )}
            <div className={styles.backToLogin}>
                <Link to="/login">back to login</Link>
            </div>
            </form>
        </div>
    );
}

export default ForgotPassword;