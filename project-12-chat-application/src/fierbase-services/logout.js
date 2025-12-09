import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export async function logout() {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error("Logout Error:", error);
        return false;
    }
}