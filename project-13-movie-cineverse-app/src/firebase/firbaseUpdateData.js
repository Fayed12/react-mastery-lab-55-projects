// local
import { db } from "./firebaseConfig"

// firbase
import { doc, updateDoc,arrayUnion, arrayRemove } from "firebase/firestore"

async function updateUserData({ data, userId, action }) {
    // data is the new object 
    const ref = doc(db, "users", userId)
    try {
        await updateDoc(ref, {
            favData:
                action === "add"
                    ? arrayUnion(data)
                    : arrayRemove(data),
        });
    } catch (err) {
        console.error("Firestore update error:", err);
    }
}

export default updateUserData;