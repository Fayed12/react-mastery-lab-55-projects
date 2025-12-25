// local
import { auth, db } from "../firebaseConfig";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function createUserWithEmail(userData, email, password) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user

        // add user to database
        const ref = doc(db, "users", user.uid)
        await setDoc(ref, {
            id: user.uid,
            ...userData,
            createdAt: new Date().toISOString()
        })

        return user
    } catch (err) {
        console.error("Error creating user:", err.message)
    }
}

export default createUserWithEmail;