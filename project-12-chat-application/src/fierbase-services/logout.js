import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export function logout() {
    return signOut(auth);
}
