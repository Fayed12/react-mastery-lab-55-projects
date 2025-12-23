// local
import { auth, db } from "./firebaseConfig";
import { google } from "./firebaseConfig";

// firebase
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, google);
        
        const user = res.user

        const userData = {
            name: user.displayName,
            userName: user.displayName.split(" ").at(0),
            email: user.email,
            favData: []
        };
        
        // add user to firestore
        await setDoc(doc(db, "users", user.uid), { id: user.uid, ...userData });
        
        return userData
    } catch (err) {
        console.error(err.message)
    }
}

export default signInWithGoogle;