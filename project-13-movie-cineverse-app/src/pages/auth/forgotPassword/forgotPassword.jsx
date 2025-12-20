// local
import toast from "react-hot-toast";
import MainButton from "../../../ui/button/mainButton";
import MainInput from "../../../ui/input/mainInput";
import styles from "./forgotPassword.module.css";
import sendEmailResetPassword from "../../../firebase/firebaseForgotPass";

// react
import { useEffect, useState } from "react";

// react form
import { useForm } from "react-hook-form";

// react router
import { useNavigate } from "react-router";

// react icons
import { IoMdArrowRoundBack } from "react-icons/io";

function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const [isSend, setIsSend] = useState(false)
    const {
        register,
        setFocus,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    // handle submit
    function onsubmit(data) {
        setLoading(true)
        toast.loading("loading...", { id: "forgot" })

        setTimeout(async () => {
            setLoading(false)
            setIsSend(true)
            toast.success("email send successfully", { id: "forgot" })

            await sendEmailResetPassword({ email: data.email })
        }, 1000);


        // set value
        setValue("email", "")
    }

    // focus when open popup
    useEffect(() => {
        setFocus("email");
    }, [setFocus]);


    return (
        <div className={styles.forgotPassword}>
            <div className={styles.container}>
                {!isSend ? (
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

                        <MainButton
                            type="submit"
                            content="send"
                            title="send"
                            isDisabled={loading}
                        />
                    </form>
                ) : (
                    <div>
                        <p className={styles.send}>
                            email send successfully, check your spam or resend it{" "}
                        </p>
                        <MainButton
                            type="button"
                            content="resend"
                            title="resend"
                            isDisabled={loading}
                            clickEvent={() => setIsSend(false)}
                        />
                    </div>
                )}
                <div className={styles.backButton}>
                    <MainButton
                        type="button"
                        content={<> <IoMdArrowRoundBack/> back</>}
                        title="back"
                        isDisabled={loading}
                        clickEvent={() => navigate("/login", { replace: true })}
                    />
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
