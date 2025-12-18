// local 
import { auth, db } from "./firebaseConfig";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function createUserWithEmail({ userData, email, password }) {
    try {

        // signUp user to database
        const newUser = await createUserWithEmailAndPassword(auth, email, password)
        const user = newUser.user

        // add user to firestore

        await setDoc(doc(db, "users", user.uid), {id:user.uid, ...userData});

        return userData;
    } catch (err) {
        throw new Error(err.message)
    }
}

export default createUserWithEmail;