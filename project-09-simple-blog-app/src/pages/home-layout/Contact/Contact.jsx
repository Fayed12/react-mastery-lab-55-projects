// local
import Input from "../../../components/ui/input/input"
import Button from "../../../components/ui/button/button";
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.contact}>
            <h1>Contact Us</h1>
            <p>contact us for any questions</p>
            <form className={styles.form}>
                <Input type="text" placeholder="Your Name" />
                <Input type="email" placeholder="Your Email" />
                <Input type="tel" placeholder="Phone Number" />
                <Input type="text" placeholder="Address" />
                <textarea
                    placeholder="Your Message"
                    className={styles.textarea}
                />
                <div className={styles.buttons}>
                    <Button type="submit" content="Send" />
                    <Button type="button" content="Reset" className={styles.resetButton} />
                </div>
            </form>
        </div>
    );
};

export default Contact;
