// local
import { auth } from "./firebaseConfig";

// firebase
import { sendPasswordResetEmail } from "firebase/auth";

const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email,{
            url: "http://localhost:5173/login",
        });
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export default resetPassword;
