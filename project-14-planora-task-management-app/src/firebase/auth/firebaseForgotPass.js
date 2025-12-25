// local
import { auth } from "../firebaseConfig";

// firebase 
import { sendPasswordResetEmail } from "firebase/auth";

async function sendEmailResetPassword(email) {
    try {
        const res = await sendPasswordResetEmail(auth, email)
        
        return res
    } catch (err) {
        console.error("Error creating user:", err.message)
    }
}

export default sendEmailResetPassword;