// local
import { auth } from "./firebaseConfig";

// firebase 
import { sendPasswordResetEmail } from "firebase/auth";

async function sendEmailResetPassword({ email }) {
    try {
        await sendPasswordResetEmail(auth, email);

    } catch (err) {
        console.error(err.message)
    }
}

export default sendEmailResetPassword;