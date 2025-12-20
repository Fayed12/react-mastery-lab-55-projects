// local
import { auth } from "../firebase/firebaseConfig"
import { db } from "../firebase/firebaseConfig"

// firebase
import { getDoc, doc } from "firebase/firestore"

async function getUserData() {
    try {
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}

export default getUserData;
