// local
import Input from "../../ui/input/input"
import Button from "../../ui/button/button";
import styles from './contactpage.module.css';

// react hook form
import { useForm } from "react-hook-form";

// emailjs
import emailjs from "@emailjs/browser";

// toast
import toast from "react-hot-toast";

// react
import { useEffect } from "react";

const ContactPage = () => {
    const { register, handleSubmit, reset, formState: { errors }, setFocus } = useForm();

    /* ================================================================================
    =                                      Form Submit                               =
    ================================================================================ */
    const onSubmit = async (data) => {
        try {
            toast.loading("Sending message... ", { id: "toastId" });
            const result = await emailjs.send(
                "service_449c5mz",
                "template_5kuvdhw",
                data,
                "gUIIilNZ0XS0cBOeU"
            );

            toast.success("Message sent successfully", { id: "toastId" });

            reset({
                name: "",
                email: "",
                phone: "",
                address: "",
                message: ""
            });

            return result
        } catch (error) {
            console.error("Email Error:", error);
            toast.error("Failed to send message", { id: "toastId" });
        }
    }

    /* ================================================================================
    =                                      Reset Form                                =
    ================================================================================ */
    const onReset = () => {
        reset({
            name: "",
            email: "",
            phone: "",
            address: "",
            message: ""
        });
    };

    /* ================================================================================
    =                                      Focus Name Input                            =
    ================================================================================ */
    useEffect(() => {
        setFocus("name");
    }, [setFocus]);

    return (
        <div className={styles.contact}>
            <h1>Contact Us</h1>
            <p>contact us for any questions</p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <Input name="name" type="text" placeholder="Your Name" register={{ ...register("name", { required: "Name is required", pattern: { value: /^[a-zA-Z ]+$/, message: "Name must contain only letters" } }) }} />
                {errors.name && <p className="error">{errors.name.message}</p>}

                <Input name="email" type="email" placeholder="example@gmail.com" register={{ ...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail.com$/, message: "Email is invalid, use .com gmail only" } }) }} />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <Input name="phone" type="tel" placeholder="Phone Number" register={{ ...register("phone", { required: "Phone is required", pattern: { value: /^01[0-9]{9}$/, message: "Phone number must be 11 digits and start with 01" } }) }} />
                {errors.phone && <p className="error">{errors.phone.message}</p>}

                <Input name="address" type="text" placeholder="Address" register={{ ...register("address") }} />

                <textarea
                    placeholder="Your Message"
                    className={styles.textarea}
                    {...register("message", { required: "Message is required" })}
                />
                {errors.message && <p className="error">{errors.message.message}</p>}

                <div className={styles.buttons}>
                    <Button type="submit" content="Send" />
                    <Button type="button" content="Reset" className={styles.resetButton} onClick={onReset} />
                </div>
            </form>
        </div>
    );
};

export default ContactPage;
