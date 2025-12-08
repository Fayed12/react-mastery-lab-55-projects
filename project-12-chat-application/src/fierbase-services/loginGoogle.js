// local
import { auth, db, googleProvider } from "./firebaseConfig";

// firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithPopup } from "firebase/auth";

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (!userSnapshot.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName?.split(" ").at(0),
                userName: user.displayName,
                country: "",
                phone: user.phoneNumber || "",
                contactedUsers: [],
            });
        }
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName?.split(" ").at(0),
        };
    } catch (error) {
        console.log(error);
        return null
    }
};