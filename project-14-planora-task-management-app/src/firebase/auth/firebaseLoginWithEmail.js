// local
import { doc, getDoc } from "firebase/firestore";
import { auth,db } from "../firebaseConfig";

// firebase
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

async function signInWithFirebase(email,password) {
    try {

        const res = await signInWithEmailAndPassword(auth, email, password)
        
        // set the user name
        const ref = doc(db, "users", res.user.uid)
        const user = await getDoc(ref)

        await updateProfile(res.user, {
            displayName: user?.data().name,
        });

        return res.user
    } catch (err) {
        console.error("Error creating user:", err.message)
    }
}

export default signInWithFirebase;