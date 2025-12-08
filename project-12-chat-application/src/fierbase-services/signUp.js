import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { setDoc, doc } from "firebase/firestore";

export async function firebaseSignUp({newUser, password}) {
    // 1) create user
    // if (!password || !newUser.email) throw new Error("Password or email is required");
    const { user } = await createUserWithEmailAndPassword(auth, newUser.email, password);

    // 2) add user name to profile
    await updateProfile(user, { displayName : newUser.displayName });

    // 3) add user data to Firestore
    await setDoc(doc(db, "users", user.uid), {uid: user.uid, ...newUser});

    return user;
}