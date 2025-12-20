// local
import { auth } from "./firebaseConfig";
import { google } from "./firebaseConfig";

// firebase
import { signInWithPopup } from "firebase/auth";

async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, google);
        return res.user
    } catch (err) {
        console.error(err.message)
    }
}

export default signInWithGoogle;