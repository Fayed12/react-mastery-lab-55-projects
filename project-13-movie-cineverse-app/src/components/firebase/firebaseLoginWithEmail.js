// local
import { auth } from "./firebaseConfig";

// firebase
import { signInWithEmailAndPassword } from "firebase/auth";

async function signInWithFirebase({email, password}) {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);

        return res.user
    } catch (err) {
        console.error(err.message)
    }
}

export default signInWithFirebase;