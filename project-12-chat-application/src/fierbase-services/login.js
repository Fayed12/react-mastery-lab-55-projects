import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function firebaseLogin(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
}
