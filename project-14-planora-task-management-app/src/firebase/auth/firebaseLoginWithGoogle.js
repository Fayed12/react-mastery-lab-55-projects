// local
import { auth, google, db } from "../firebaseConfig";

// firebase
import { signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";

async function signInWithGoogle() {
    try {
        const res = await signInWithPopup(auth, google)
        const user = res.user

        // add user to database
        const ref = doc(db, "users", user.uid)
        const userSnap = await getDoc(ref)

        if (!userSnap.exists()) {
            await setDoc(ref, {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                createdAt: new Date().toISOString()
            })
        }

        return user

    } catch (err) {
        console.error("Error creating user:", err.message)
    }
}

export default signInWithGoogle